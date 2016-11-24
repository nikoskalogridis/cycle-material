/*jslint
    es6
*/

import xs from "xstream";
import intent from "./intent";
import model from "./model";
import view from "./view";
import {mdButton} from "../../../../lib";

function createComponentFactory(sources) {
    return function createComponent(component, props) {
        return component({
            DOM: sources.DOM,
            // Temporary fix waiting for https://github.com/cyclejs/cyclejs/issues/476
            // to be resolved
            props: xs.fromPromise(Promise.resolve(props))
            //props: xs.of(props)
        });
    };
}

function getFields(fields, attr) {
    return Object
        .keys(fields)
        .reduce(function (result, key) {
            result[key] = fields[key][attr];
            return result;
        }, {});
}

export default function ButtonsPage(sources) {
    const createComponent = createComponentFactory(sources);
    const childComponents = {
        defaultFlatButton: createComponent(mdButton, {text: "default", flat: true}),
        primaryFlatButton: createComponent(mdButton, {text: "primary", primary: true, flat: true, style: {"margin-left": "1em"}}),
        secondaryFlatButton: createComponent(mdButton, {text: "secondary", secondary: true, flat: true, style: {"margin-left": "1em"}}),
        defaultRaisedButton: createComponent(mdButton, {text: "default", flat: false}),
        primaryRaisedButton: createComponent(mdButton, {text: "primary", primary: true, flat: false, style: {"margin-left": "1em"}}),
        secondaryRaisedButton: createComponent(mdButton, {text: "secondary", secondary: true, flat: false, style: {"margin-left": "1em"}}),
        defaultFlatButtonDisabled: createComponent(mdButton, {enabled: false, text: "default", flat: true}),
        primaryFlatButtonDisabled: createComponent(mdButton, {enabled: false, text: "primary", primary: true, flat: true, style: {"margin-left": "1em"}}),
        secondaryFlatButtonDisabled: createComponent(mdButton, {enabled: false, text: "secondary", secondary: true, flat: true, style: {"margin-left": "1em"}}),
        defaultRaisedButtonDisabled: createComponent(mdButton, {enabled: false, text: "default", flat: false}),
        primaryRaisedButtonDisabled: createComponent(mdButton, {enabled: false, text: "primary", primary: true, flat: false, style: {"margin-left": "1em"}}),
        secondaryRaisedButtonDisabled: createComponent(mdButton, {enabled: false, text: "secondary", secondary: true, flat: false, style: {"margin-left": "1em"}})
    };

    //const inputFieldsEvents = getFields(childComponents, "events");
    const inputFieldsDOMs = getFields(childComponents, "DOM");

    const action$ = intent(sources.DOM);
    const state$ = model(action$);
    const vdom$ = view(state$, inputFieldsDOMs);

    const sinks = {
        DOM: vdom$
    };
    return sinks;
}

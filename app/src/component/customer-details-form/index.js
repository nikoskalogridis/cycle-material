/*jslint
    es6
*/

import xs from "xstream";
import intent from "./intent";
import model from "./model";
import view from "./view";
import {mdButton, mdInput, mdSelect} from "../../../../lib";

function createComponentFactory(sources) {
    return function createComponent(component, props) {
        return component({
            DOM: sources.DOM,
            props: xs.of(props)
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

export default function CustomerDetailsForm(sources) {
    const createComponent = createComponentFactory(sources);
    const childComponents = {
        firstNameInput: createComponent(mdInput, {label: "First"}),
        lastNameInput: createComponent(mdInput, {label: "Last"}),
        emailInput: createComponent(mdInput, {label: "Email", type: "email"}),
        mobileInput: createComponent(mdInput, {label: "Mobile"}),
        phoneInput: createComponent(mdInput, {label: "Phone"}),
        saveButton: createComponent(mdButton, {primary: true, text: "Save"}),
        cancelButton: createComponent(mdButton, {text: "Cancel"}),
        genderSelect: createComponent(
            mdSelect,
            {
                label: "Gender",
                options: [
                    {value: 0, label: "Male"},
                    {value: 1, label: "Female"}
                ],
                selected: {value: 0, label: "Male"}
            }
        )
    };

    const inputFieldsEvents = getFields(childComponents, "events");
    const inputFieldsDOMs = getFields(childComponents, "DOM");

    const action$ = intent(sources.DOM);
    const state$ = model(action$, inputFieldsEvents.saveButton);
    const vdom$ = view(state$, inputFieldsDOMs);

    const sinks = {
        DOM: vdom$
    };
    return sinks;
}

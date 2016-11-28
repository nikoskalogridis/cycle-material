/*jslint
    es6
*/

import xs from "xstream";
import lodash from "lodash";
import onionify from "cycle-onionify";
import intent from "./intent";
import model from "./model";
import view from "./view";
import {mdButton, mdInput, mdSelect} from "../../../../lib";

function getFields(fields, attr) {
    return Object
        .keys(fields)
        .reduce(function (result, key) {
            result[key] = fields[key][attr];
            return result;
        }, {});
}

function createOnionComponents(components, sources) {
    return Object.keys(components).reduce(function (output, component) {
        output[component] = components[component](sources, component);
        return output;
    }, {});
}

function customerDetailsForm(sources) {
    const childOnionComponents = createOnionComponents(
        {
            firstNameInput: mdInput,
            lastNameInput: mdInput,
            emailInput: mdInput,
            mobileInput: mdInput,
            phoneInput: mdInput,
            saveButton: mdButton,
            cancelButton: mdButton,
            genderSelect: mdSelect
        },
        sources
    );
    const childEventSinks = getFields(childOnionComponents, "events");
    const childVNodeSinks = getFields(childOnionComponents, "DOM");
    const childOnionSinks = getFields(childOnionComponents, "onion");

    const action$ = intent(sources, childEventSinks);
    const state$ = model(action$);
    const vdom$ = view(sources.onion.state$, childVNodeSinks);
    const sinks = {
        DOM: vdom$,
        router: state$.router,
        onion: xs.merge(state$.reducers, ...lodash.toArray(childOnionSinks))
    };
    return sinks;
}

export default function (sources) {
    return onionify(customerDetailsForm)(sources);
}
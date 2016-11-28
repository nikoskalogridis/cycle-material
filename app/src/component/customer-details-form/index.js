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

// function createComponentFactory(sources, model) {
//     return function createComponent(component, props, path) {
//         return component({
//             DOM: sources.DOM,
//             props: xs.merge(
//                 // Temporary fix waiting for https://github.com/cyclejs/cyclejs/issues/476
//                 // to be resolved
//                 //props: xs.of(props)
//                 xs.fromPromise(Promise.resolve(props)),
//                 path
//                     ? model
//                         .map(function (customer) {
//                             return {text: lodash.get(customer, path)};
//                         })
//                     : undefined
//             )
//         });
//     };
// }

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
    // const createComponent = createComponentFactory(sources);
    // const childComponents = {
    //     firstNameInput: createComponent(mdInput, {label: "First"}, "name.first"),
    //     lastNameInput: createComponent(mdInput, {label: "Last"}, "name.last"),
    //     emailInput: createComponent(mdInput, {label: "Email", type: "email"}, "email"),
    //     mobileInput: createComponent(mdInput, {label: "Mobile"}, "phone"),
    //     phoneInput: createComponent(mdInput, {label: "Phone"}, "phone2"),
    //     saveButton: createComponent(mdButton, {flat: true, text: "Save"}),
    //     cancelButton: createComponent(mdButton, {text: "Cancel", flat: true, style: {"margin-left": "1em"}}),
    //     genderSelect: createComponent(
    //         mdSelect,
    //         {
    //             label: "Gender",
    //             options: [
    //                 {value: "male", label: "Male"},
    //                 {value: "female", label: "Female"}
    //             ],
    //             selected: {value: 0, label: "Male"}
    //         }
    //     )
    // };

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
    const childOnionArray = lodash.toArray(childOnionSinks);

    const action$ = intent(sources, childEventSinks.cancelButton);
    const state$ = model(action$);
    const vdom$ = view(sources.onion.state$, childVNodeSinks);
    const sinks = {
        DOM: vdom$,
        router: state$.router,
        onion: xs.merge(state$.reducers, ...childOnionArray)
    };
    return sinks;
}

export default function (sources) {
    return onionify(customerDetailsForm)(sources);
}
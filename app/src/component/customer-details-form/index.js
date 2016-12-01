/*jslint
    es6
*/
/*property
    DOM, cancelButton, emailInput, firstNameInput, genderSelect, lastNameInput,
    merge, mobileInput, onion, phoneInput, reducers, router, saveButton,
    state$, toArray, assign, eventSinks, vNodeSinks, onionSinks, formReducers,
    modelEvents
*/

import xs from "xstream";
import lodash from "lodash";
import onionify from "cycle-onionify";
import {mdButton} from "../../../../lib";
import {getFields, createComponents} from "../../helpers/utils";
import intent from "./intent";
import model from "./model";
import view from "./view";
import {formSpec} from "./customerFormSpec";
import createFormFunction from "./formHelper";

function customerDetailsForm(sources) {
    const formComponents = createFormFunction(formSpec, "customer")(sources);
    const buttonComponents = createComponents(
        {
            saveButton: mdButton,
            cancelButton: mdButton
        },
        sources
    );
    const childEventSinks = Object.assign(formComponents.eventSinks, getFields(buttonComponents, "events"));
    const childVNodeSinks = Object.assign(formComponents.vNodeSinks, getFields(buttonComponents, "DOM"));
    const childOnionSinks = Object.assign(formComponents.onionSinks, getFields(buttonComponents, "onion"));

    const action$ = intent(sources, childEventSinks);
    const state$ = model(xs.merge(action$, formComponents.modelEvents));
    const vdom$ = view(sources.onion.state$, childVNodeSinks);
    const sinks = {
        DOM: vdom$,
        router: state$.router,
        onion: xs.merge(
            formComponents.formReducers,
            state$.reducers,
            ...lodash.toArray(childOnionSinks)
        )
    };
    return sinks;
}

export default function (sources) {
    return onionify(customerDetailsForm)(sources);
}
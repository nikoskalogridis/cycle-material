/*jslint
    es6
*/

import xs from "xstream";
import deepAssign from "deep-assign";
import {getFields, createComponents, actionFilter, map} from "../../helpers/utils";
import lodash from "lodash";
import validate from "validate.js";

function flatMapObject(result, value) {
    return Object.assign(result || {}, value);
}

export default function createFormFunction(spec) {
    const specKeys = Object.keys(spec);
    function validationErrorsToState(validationErrors = {}) {
        return specKeys
            .map(function (specKey) {
                const {name, hasError, errorMessage} = spec[specKey].component;
                return {
                    [name]: {
                        [hasError]: !!validationErrors[specKey],
                        [errorMessage]: validationErrors[specKey]
                            ? validationErrors[specKey][0]
                            : ""
                    }
                };
            })
            .reduce(flatMapObject);
    }

    return function (sources) {
        const components = createComponents(
            specKeys
                .map(function (specKey) {
                    const {name, type} = spec[specKey].component;
                    return {
                        [name]: type
                    }
                })
                .reduce(flatMapObject),
            sources
        );

        // intent

        const customer$ = sources.customer
            .map(function (customer) {
                return {
                    type: "CUSTOMER",
                    customer: customer
                };
            });

        const eventSinks = getFields(components, "events");

        const eventStreams = specKeys
            .map(function (specKey) {
                return eventSinks[spec[specKey].component.name]
                    .map(function (event) {
                        return lodash.set({}, specKey, event.value);
                    });
            });

        const changeEvents$ = xs
            .merge(...eventStreams)
            .map(function (payload) {
                return {
                    type: "UPDATE",
                    payload
                };
            });

        const action$ = xs
            .merge(
                customer$,
                changeEvents$
            );

        // model

        const modelStateMap = specKeys
            .map(function (specKey) {
                const {name, value} = spec[specKey].component;
                return {
                    [specKey]: name + "." + value
                }
            })
            .reduce(flatMapObject);

        const {toModel, toState} = map(modelStateMap);

        const modelConstraints = specKeys
            .map(function (specKey) {
                return {
                    [specKey]: spec[specKey].constraints
                };
            })
            .reduce(flatMapObject);

        const initialState = specKeys
            .map(function (specKey) {
                const {name, initialState} = spec[specKey].component;
                return {
                    [name]: initialState
                }
            })
            .reduce(flatMapObject);

        const initReducer$ = xs.of(
            function initReducer(prevState) {
                return deepAssign(
                    {},
                    prevState,
                    initialState
                );
            }
        );

        const customerReducer$ = action$
            .filter(actionFilter("CUSTOMER"))
            .map((action) => function customerReducer(prevState) {
                return deepAssign(
                    {},
                    prevState,
                    toState(action.customer),
                    {
                        saveButton: {
                            enabled: false
                        },
                        dirty: false,
                        valid: true
                    }
                );
            });

        const updateCustomerReducer$ = action$
            .filter(actionFilter("UPDATE"))
            .map((action) => function updateCustomerReducer(prevState) {
                const customer = deepAssign(toModel(prevState), action.payload);
                const validationErrors = validate(customer, modelConstraints);
                return deepAssign(
                    {},
                    prevState,
                    toState(customer),
                    validationErrorsToState(validationErrors),
                    {
                        saveButton: {
                            enabled: !validationErrors
                        },
                        dirty: true,
                        valid: true
                    }
                );
            });


        return {
            eventSinks,
            vNodeSinks: getFields(components, "DOM"),
            onionSinks: getFields(components, "onion"),
            formReducers: xs
                .merge(
                    initReducer$,
                    customerReducer$,
                    updateCustomerReducer$
                )
        };
    };
}

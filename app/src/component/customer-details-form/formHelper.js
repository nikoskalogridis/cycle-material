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
    return function (sources) {
        function validationErrorsToState(validationErrors = {}) {
            return Object
                .keys(spec)
                .map(function (specModel) {
                    const component = spec[specModel].component;
                    return {
                        [component.name]: {
                            [component.hasError]: !!validationErrors[specModel],
                            [component.errorMessage]: validationErrors[specModel]
                                ? validationErrors[specModel][0]
                                : ""
                        }
                    };
                })
                .reduce(flatMapObject);
        }

        const components = createComponents(
            Object
                .keys(spec)
                .map(function (specModel) {
                    const {name, type} = spec[specModel].component;
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

        const eventStreams = Object
            .keys(spec)
            .map(function (specModel) {
                return eventSinks[spec[specModel].component.name]
                    .map(function (event) {
                        return lodash.set({}, specModel, event.value);
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

        const modelStateMap = Object
            .keys(spec)
            .map(function (specModel) {
                const {name, value} = spec[specModel].component;
                return {
                    [specModel]: name + "." + value
                }
            })
            .reduce(flatMapObject);

        const {toModel, toState} = map(modelStateMap);

        const modelConstraints = Object
            .keys(spec)
            .map(function (specModel) {
                return {
                    [specModel]: spec[specModel].constraints
                };
            })
            .reduce(flatMapObject);

        const initialState = Object
            .keys(spec)
            .map(function (specModel) {
                const {name, initialState} = spec[specModel].component;
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

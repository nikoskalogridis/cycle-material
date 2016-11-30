/*jslint
    es6
*/

import xs from "xstream";
import deepAssign from "deep-assign";
import {getFields, createComponents, actionFilter, map, flatMapObject} from "../../helpers/utils";
import lodash from "lodash";
import validate from "validate.js";

export default function createFormFunction(spec, modelName = "model") {
    const specKeys = Object.keys(spec);

    function validationErrorsToState(validationErrors = {}) {
        return specKeys
            .map(function (key) {
                const component = spec[key].component;
                return {
                    [component.name]: {
                        [component.hasError]: !!validationErrors[key],
                        [component.errorMessage]: validationErrors[key]
                            ? validationErrors[key][0]
                            : ""
                    }
                };
            })
            .reduce(flatMapObject);
    }

    const componentsSpec = specKeys
        .map(function (key) {
            const {name, type} = spec[key].component;
            return {
                [name]: type
            };
        })
        .reduce(flatMapObject);

    const modelStateMap = specKeys
        .map(function (key) {
            const {name, value} = spec[key].component;
            return {
                [key]: name + "." + value
            }
        })
        .reduce(flatMapObject);

    const {toModel, toState} = map(modelStateMap);

    const modelConstraints = specKeys
        .map(function (key) {
            return {
                [key]: spec[key].constraints
            };
        })
        .reduce(flatMapObject);

    const initialState = specKeys
        .map(function (key) {
            const {name, initialState} = spec[key].component;
            return {
                [name]: initialState
            }
        })
        .reduce(flatMapObject);

    return function (sources) {
        const components = createComponents(componentsSpec, sources);
        const eventSinks = getFields(components, "events");

        // intent

        const model$ = sources[modelName]
            .map(function (model) {
                return {
                    type: "MODEL",
                    model
                };
            });

        const eventStreams = specKeys
            .map(function (key) {
                return eventSinks[spec[key].component.name]
                    .map(function (event) {
                        return lodash.set({}, key, event.value);
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
                model$,
                changeEvents$
            );

        // model

        const initReducer$ = xs.of(
            function initReducer(prevState) {
                return deepAssign(
                    {},
                    prevState,
                    initialState
                );
            }
        );

        const modelReducer$ = action$
            .filter(actionFilter("MODEL"))
            .map((action) => function modelReducer(prevState) {
                return deepAssign(
                    {},
                    prevState,
                    toState(action.model),
                    {
                        dirty: false
                    }
                );
            });

        const updateModelReducer$ = action$
            .filter(actionFilter("UPDATE"))
            .map((action) => function updateModelReducer(prevState) {
                const model = deepAssign(toModel(prevState), action.payload);
                return deepAssign(
                    {},
                    prevState,
                    toState(model),
                    {
                        dirty: true
                    }
                );
            });

        const validationReducer$ = xs
            .merge(
                modelReducer$,
                updateModelReducer$
            )
            .map(() => function validationReducer(prevState) {
                const validationErrors = validate(toModel(prevState), modelConstraints);
                return deepAssign(
                    {},
                    prevState,
                    validationErrorsToState(validationErrors),
                    {
                        valid: !validationErrors
                    }
                );
            })

        const modelEvents = validationReducer$
            .map(function () {
                return {
                    type: "MODELCHANGE",
                }
            });

        return {
            eventSinks,
            vNodeSinks: getFields(components, "DOM"),
            onionSinks: getFields(components, "onion"),
            formReducers: xs
                .merge(
                    initReducer$,
                    modelReducer$,
                    updateModelReducer$,
                    validationReducer$
                ),
            modelEvents
        };
    };
}

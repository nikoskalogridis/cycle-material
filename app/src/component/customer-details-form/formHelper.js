/*jslint
    es6
*/

import xs from "xstream";
import {createComponents, actionFilter, flattenObject} from "../../helpers/utils";
import _ from "lodash";
import validate from "validate.js";

export default function createFormFunction(spec, modelName = "model") {
    const componentsMap = _(spec)
        .mapValues("component");

    const validateModel = _.partialRight(validate, _.mapValues(spec, "constraints"));

    function validationErrorsToState(errors = {}) {
        return componentsMap
            .mapValues(function ({name, hasError, errorMessage}, key) {
                const value = {};
                if (hasError) {
                    value[hasError] = !!errors[key];
                }
                if (errorMessage) {
                    value[errorMessage] = errors[key]
                        ? errors[key][0]
                        : "";
                }
                return {name, value};
            })
            .keyBy("name")
            .mapValues("value")
            .value();
    }

    function translate(object, map) {
        return _.reduce(
            flattenObject(object),
            (result, value, key) => _.set(result, map[key], value),
            {}
        );
    }

    const map = componentsMap
        .mapValues(function ({name, value}) {
            return `${name}.${value}`;
        })
        .value();

    const toState = _.partialRight(translate, map);
    const toModel = _.partialRight(translate, _.invert(map));

    const componentsSpec = componentsMap
        .keyBy("name")
        .mapValues("type")
        .value();

    const initState = componentsMap
        .keyBy("name")
        .mapValues("initialState")
        .value();

    return function (sources) {
        const components = createComponents(componentsSpec, sources);
        const eventSinks = _.mapValues(components, "events");

        // intent

        const model$ = sources[modelName]
            .map(function (model) {
                return {
                    type: "MODEL",
                    model
                };
            });

        const eventStreams = componentsMap
            .mapValues("name")
            .map((value, key) => eventSinks[value]
                .map((event) => _.set({}, key, event.value)))
            .value();

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
                return _.merge(
                    initState,
                    prevState
                );
            }
        );

        const modelReducer$ = action$
            .filter(actionFilter("MODEL"))
            .map((action) => function modelReducer(prevState) {
                return _.merge(
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
                return _.merge(
                    {},
                    prevState,
                    toState(_.merge(toModel(prevState), action.payload)),
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
            .mapTo(function validationReducer(prevState) {
                const validationErrors = validateModel(toModel(prevState));
                return _.merge(
                    {},
                    prevState,
                    validationErrorsToState(validationErrors),
                    {
                        valid: !validationErrors
                    }
                );
            });

        const modelEvents = validationReducer$
            .mapTo({type: "MODELCHANGE"});

        return {
            eventSinks,
            vNodeSinks: _.mapValues(components, "DOM"),
            onionSinks: _.mapValues(components, "onion"),
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

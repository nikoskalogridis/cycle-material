/*jslint
    es6
*/

import xs from "xstream";
import lodash from "lodash";

function getFields(fields, attr) {
    return Object
        .keys(fields)
        .reduce(
            function (result, key) {
                result[key] = fields[key][attr];
                return result;
            },
            {}
        );
}

function createComponents(components, sources) {
    return Object
        .keys(components)
        .reduce(
            function (output, component) {
                output[component] = components[component](sources, component);
                return output;
            },
            {}
        );
}

function combineStreamsObject(StreamObject) {
    const inputArray = Object
        .keys(StreamObject)
        .map(function (key) {
            return StreamObject[key];
        });
    return xs
        .combine(...inputArray)
        .map(function (outputArray) {
            return Object
                .keys(StreamObject)
                .reduce(
                    function (c, key, index) {
                        c[key] = outputArray[index];
                        return c;
                    },
                    {}
                );
        });
}

function map(mappings) {
    return {
        toModel: (state) => Object
            .keys(mappings)
            .reduce(
                (result, key) => result.set(key, lodash.get(state, mappings[key])),
                lodash({})
            )
            .value(),
        toState: (model) => Object
            .keys(mappings)
            .reduce(
                (result, key) => result.set(mappings[key], lodash.get(model, key)),
                lodash({})
            )
            .value()
    };
}

function actionFilter(type) {
    return function (action) {
        return action.type === type;
    };
}

function flatMapObject(result, value) {
    return Object.assign(result || {}, value);
}

export {
    getFields,
    createComponents,
    combineStreamsObject,
    map,
    actionFilter,
    flatMapObject
};

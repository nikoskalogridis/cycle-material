/*jslint
    es6
*/

import xs from "xstream";
import _ from "lodash";

const getFields = _.mapValues;

function createComponents(components, sources) {
    return _.mapValues(components, (value, key) => value(sources, key));
}

// function combineStreamsObject(streamsObject) {
//     const inputArray = Object
//         .keys(streamsObject)
//         .map(function (key) {
//             return streamsObject[key];
//         });
//     return xs
//         .combine(...inputArray)
//         .map(function (outputArray) {
//             return Object
//                 .keys(streamsObject)
//                 .reduce(
//                     function (c, key, index) {
//                         c[key] = outputArray[index];
//                         return c;
//                     },
//                     {}
//                 );
//         });
// }

function combineStreamsObject(streamsMap) {
    return xs
        .combine(..._.values(streamsMap))
        .map(_.partial(_.zipObject, _.keys(streamsMap)));
}

const actionFilter = _.partial(_.matchesProperty, "type");

function flattenObject(source, pathDelimiter = ".") {
    function reducer(o, value, key) {
        o.path.push(key);
        if (_.isPlainObject(value)) {
            o = _.reduce(value, reducer, o);
        } else {
            o.value[o.path.join(pathDelimiter)] = value;
        }
        o.path.pop();
        return o;
    }
    return _.reduce(source, reducer, {value: {}, path: []}).value;
}

export {
    getFields,
    createComponents,
    combineStreamsObject,
    actionFilter,
    flattenObject
};

/*jslint
    es6
*/
export default function getChild(object, keyName) {
    return keyName.split(".").reduce(function (object, key) {
        return object !== undefined
            ? object[key]
            : object;
    }, object);
}

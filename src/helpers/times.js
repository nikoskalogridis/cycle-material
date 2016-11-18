/*jslint
    es6
*/
export default function times(n, iteratee) {
    let index = 0;
    const result = [];

    while (index < n) {
        result[index] = iteratee(index);
        index += 1;
    }
    return result;
}

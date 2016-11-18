/*jslint
    es6
*/
function actionFilter(type) {
    return function (action) {
        return action.type === type;
    };
}

export {
    actionFilter
};

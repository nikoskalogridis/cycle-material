/*jslint
    es6
*/
/*property
    assign, events$, filter, fold, isOpen, items, map, merge, rightAlign,
    state$, type
*/

import xs from "xstream";
import {actionFilter} from "../../helpers/actionFilter";

function model(action$, props$) {
    const clickReducer$ = action$
        .filter(actionFilter("CLICK"))
        .map(() => function clickReducer(state) {
            return Object.assign({}, state, {isOpen: true});
        });

    const closeReducer$ = action$
        .filter(actionFilter("CLOSE"))
        .map(() => function closeReducer(state) {
            return Object.assign({}, state, {isOpen: false});
        });

    const propsReducer$ = props$
        .map((props) => function propsReducer(state) {
            return Object.assign({}, state, props);
        });

    const defaultProps = {
        isOpen: false,
        rightAlign: false,
        items: []
    };

    const reducers$ = xs.merge(
        clickReducer$,
        closeReducer$,
        propsReducer$
    );

    const state$ = reducers$
        .fold((prevState, reducer) => reducer(prevState), defaultProps);

    const events$ = action$
        .filter(actionFilter("CLICK"))
        .map(function () {
            return {
                type: "CLICK"
            };
        });

    return {
        state$,
        events$
    };
}

export default model;

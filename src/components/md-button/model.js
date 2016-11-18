/*jslint
    es6
*/

import xs from "xstream";
import {actionFilter} from "../../helpers/actionFilter";

function model(action$, props$) {
    const defaultProps = {
        flat: false,
        primary: false,
        secondary: false,
        type: "button",
        enabled: true,
        text: "button"
    };

    const clickReducer$ = action$
        .filter(actionFilter("CLICK"))
        .map((action) => function clickReducer(state) {
            return Object.assign({}, state, {value: action.data});
        });

    const propsReducer$ = props$
        .map((props) => function propsReducer(state) {
            return Object.assign({}, state, props);
        });

    const reducers$ = xs.merge(
        clickReducer$,
        propsReducer$
    );

    const state$ = reducers$.fold(function (prevState, reducer) {
        return reducer(prevState);
    }, defaultProps);

    const events$ = state$.map(function () {
        return {type: "CLICK"};
    });

    return {
        state$,
        events$
    };
}

export default model;

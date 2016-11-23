/*jslint
    es6
*/

import xs from "xstream";
import concat from "xstream/extra/concat";
import {actionFilter} from "../../helpers/actionFilter";

const defaultState = {
    flat: false,
    primary: false,
    secondary: false,
    type: "button",
    enabled: true,
    text: "Button"
};

function model(action$) {
    const defaultReducer$ = xs
        .of(function defaultReducer(state) {
            return state === undefined
                ? defaultState
                : state;
        });

    const propsReducer$ = action$
        .filter(actionFilter("PROPS"))
        .map((action) => function propsReducer(state) {
            return Object.assign({}, state, action.props);
        });

    const reducer$ = xs
        .merge(
            defaultReducer$,
            propsReducer$
        );

    const clickAction$ = action$
        .filter(actionFilter("CLICK"))
        .map(function () {
            return {type: "CLICK"};
        });

    return {
        reducers: reducer$,
        events: clickAction$
    };
}

export default model;

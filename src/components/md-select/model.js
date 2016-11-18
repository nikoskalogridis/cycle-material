/*jslint
    es6
*/

import xs from "xstream";
import {actionFilter} from "../../helpers/actionFilter";
import dropRepeats from "xstream/extra/dropRepeats";

function model(action$, props$) {
    const changeReducer$ = action$
        .filter(actionFilter("CHANGE"))
        .map((action) => function changeReducer(state) {
            return Object.assign({}, state, {value: action.data});
        });

    const focusReducer$ = action$
        .filter(actionFilter("FOCUS"))
        .map(() => function focusReducer(state) {
            return Object.assign({}, state, {isFocused: true});
        });

    const blurReducer$ = action$
        .filter(actionFilter("BLUR"))
        .map(() => function blurReducer(state) {
            return Object.assign({}, state, {isFocused: false});
        });

    const clickReducer$ = action$
        .filter(actionFilter("CLICK"))
        .map(() => function clickReducer(state) {
            return Object.assign({}, state);
        });

    const inputReducer$ = action$
        .filter(actionFilter("INPUT"))
        .map((action) => function inputReducer(state) {
            return Object.assign({}, state, {value: action.data});
        });

    const propsReducer$ = props$
        .map((props) => function propsReducer(state) {
            return Object.assign({}, state, props);
        });

    const defaultProps = {
        isError: false,
        isOpen: false,
        isSuccess: false,
        label: "",
        message: "",
        options: [],
        readOnly: false,
        selected: false,
        value: ""
    };

    const reducers$ = xs.merge(
        clickReducer$,
        focusReducer$,
        blurReducer$,
        changeReducer$,
        inputReducer$,
        propsReducer$
    );

    const state$ = reducers$.fold(function (prevState, reducer) {
        return reducer(prevState);
    }, defaultProps);

    const events$ = state$
        .compose(dropRepeats(function (prev, current) {
            return prev.value === current.value;
        }))
        .map(function (state) {
            return {
                type: "CHANGE",
                value: state.value
            };
        });

    return {
        state$,
        events$
    };
}

export default model;

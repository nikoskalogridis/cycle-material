/*jslint
    es6
*/

import xs from "xstream";
import {actionFilter} from "../../helpers/actionFilter";
import dropRepeats from "xstream/extra/dropRepeats";

const defaultState = {
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

function model(action$) {
    const defaultReducer$ = xs
        .of(function defaultReducer(state) {
            return Object.assign({}, defaultState, state);
        });

    const propsReducer$ = action$
        .filter(actionFilter("PROPS"))
        .map((action) => function propsReducer(state) {
            return Object.assign({}, state, action.props);
        });

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
            return Object.assign({}, state, {isOpen: true});
        });

    const inputReducer$ = action$
        .filter(actionFilter("INPUT"))
        .map((action) => function inputReducer(state) {
            return Object.assign({}, state, {value: action.data});
        });

    const closeReducer$ = action$
        .filter(actionFilter("CLOSE"))
        .map(() => function closeReducer(state) {
            return Object.assign({}, state, {isOpen: false});
        });

    const selectReducer$ = action$
        .filter(actionFilter("SELECT"))
        .map(() => function selectReducer(state) {
            return Object.assign({}, state);
        });

    const reducer$ = xs.merge(
        defaultReducer$,
        clickReducer$,
        closeReducer$,
        focusReducer$,
        blurReducer$,
        changeReducer$,
        inputReducer$,
        propsReducer$,
        selectReducer$
    );

    const events$ = action$
        .filter(actionFilter("CHANGE"))
        .map(function (action) {
            return {
                type: "CHANGE",
                value: action.data
            };
        })
        .compose(dropRepeats(function (prev, current) {
            return prev.value === current.value;
        }));

    return {
        reducers: reducer$,
        events: events$
    };
}

export default model;

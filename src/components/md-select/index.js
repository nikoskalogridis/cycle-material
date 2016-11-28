/*jslint
    es6
*/
/*property
    DOM, drop, events, fold, onion, reducers, state$
*/

import isolate from "@cycle/isolate";
import intent from "./intent";
import model from "./model";
import view from "./view";

function select(sources) {
    const action$ = intent(sources);
    const state = model(action$);
    const state$ = !!sources.onion
        ? sources.onion.state$
        : state
            .reducers
            .fold((prevState, reducer) => reducer(prevState))
            .drop(1);

    const vdom$ = view(state$);

    const sinks = {
        DOM: vdom$,
        events: state.events,
        onion: state.reducers
    };
    return sinks;
}

export default function mdSelect(sources, scope) {
    return isolate(select, scope)(sources);
}

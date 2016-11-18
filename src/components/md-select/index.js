/*jslint
    es6
*/

import isolate from "@cycle/isolate";
import intent from "./intent";
import model from "./model";
import view from "./view";
//import xs from "xstream";

function select(sources) {
    const action$ = intent(sources.DOM);
    const modelStreams = model(action$, sources.props);
    const state$ = modelStreams.state$;
    const vdom$ = view(state$);

    const sinks = {
        DOM: vdom$,
        events: modelStreams.events$
    };
    return sinks;
}

export default function mdSelect(sources) {
    return isolate(select)(sources);
}
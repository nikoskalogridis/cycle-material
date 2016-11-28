/*jslint
    es6
*/
/*property
    DOM, events, events$, props, state$
*/

import isolate from "@cycle/isolate";
import intent from "./intent";
import model from "./model";
import view from "./view";
//import xs from "xstream";

function menu(sources) {
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

export default function mdMenu(sources) {
    return isolate(menu)(sources);
}

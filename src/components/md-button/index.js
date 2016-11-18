/*jslint
    es6
*/

import isolate from "@cycle/isolate";
import intent from "./intent";
import model from "./model";
import view from "./view";

function button(sources) {
    const action$ = intent(sources.DOM);
    const state = model(action$, sources.props);
    const vdom$ = view(state.state$);

    const sinks = {
        DOM: vdom$,
        events: state.events$
    };
    return sinks;
}

export default function mdButton(sources) {
    return isolate(button)(sources);
}

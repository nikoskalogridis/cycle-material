/** @module mdInput */

/**
 * @file mdInput component
 */

/**
 * @typedef {Object} InputSinks
 *
 * @property {vNode$} DOM - The vNodes stream of the component
 * @property {inputEvents$} events - The input events stream
 * @property {inputState$} [onion] - The onion reducer$ for the component
 */

/**
 * @typedef {Object} InputProps
 *
 * @property {boolean} [isFocused = false]
 * @property {boolean} [isError = false]
 * @property {boolean} [isSuccess = false]
 * @property {string} [label = "Input"] - The label used for this input
 * @property {string} [message = ""]
 * @property {boolean} [readOnly = false]
 * @property {string} [type = "text"] - The type attribute used for this input.
 * @property {string} [value = ""]
 * @property {Object} [style] - A style object containing custom css styling for
 *  this input component
 */

/*jslint
    es6
*/

import isolate from "@cycle/isolate";
import intent from "./intent";
import model from "./model";
import view from "./view";

function input(sources) {
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

/**
 * Create a mdInput component.
 *  The mdInput component is compatible with both onionify fractal states and also
 *  with the props, state model.
 *
 * @param {Object} sources - The sources object for this component
 *  @param {DOMSource} sources.DOM - The DOMSource driver
 *  @param {Stream<InputProps>} [sources.props] - The properties stream for the component
 *  @param {StateSource} [sources.onion] - The onionify StateSource for the component
 * @param {scope} [scope] - A named scope for the isolated component
 *
 * @returns {InputSinks} sinks - The sinks object of the component
 */
export default function mdInput(sources, scope) {
    return isolate(input, scope)(sources);
}

/** @module mdButton */

/**
 * @file mdButton component
 */

/**
 * @typedef {Object} ButtonSinks
 *
 * @property {vNode$} DOM - The vNodes stream of the component
 * @property {buttonEvents$} events - The button events stream
 * @property {buttonState$} [onion] - The onion reducer$ for the component
 */

/**
 * @typedef {Object} ButtonProps
 *
 * @property {boolean} [flat = false]
 * @property {boolean} [primary = false]
 * @property {boolean} [secondary = false]
 * @property {string} [type = "button"] - The type attribute used for this button.
 *  Valid values are "button" and "submit"
 * @property {boolean} [enabled = true]
 * @property {string} [text = "Button"]
 * @property {Object} [style] - A style object containing custom css styling for
 *  this button component
 */

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

function button(sources) {
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
 * Create a mdButton component.
 *  The mdButton component is compatible with both onionify fractal states and also
 *  with the props, state model.
 *
 * @param {Object} sources - The sources object for this component
 *  @param {DOMSource} sources.DOM - The DOMSource driver
 *  @param {Stream<ButtonProps>} [sources.props] - The properties stream for the component
 *  @param {StateSource} [sources.onion] - The onionify StateSource for the component
 * @param {scope} [scope] - A named scope for the isolated component
 *
 * @returns {ButtonSinks} sinks - The sinks object of the component
 */
export default function mdButton(sources, scope) {
    return isolate(button, scope)(sources);
}

/*jslint
    es6
*/

import xs from "xstream";

function intent(DOMSource) {
    const clickAction$ = DOMSource
        .select("input")
        .events("click")
        .mapTo({type: "CLICK"});

    const focusAction$ = DOMSource
        .select("input")
        .events("focus")
        .mapTo({type: "FOCUS"});

    const blurAction$ = DOMSource
        .select("input")
        .events("blur")
        .mapTo({type: "BLUR"});

    const changeAction$ = DOMSource
        .select("input")
        .events("change")
        .map(function (ev) {
            return {
                type: "CHANGE",
                data: ev.target.value
            };
        });

    const inputAction$ = DOMSource
        .select("input")
        .events("input")
        .map(function (ev) {
            return {
                type: "INPUT",
                data: ev.target.value
            };
        });

    return xs.merge(clickAction$, focusAction$, blurAction$, changeAction$, inputAction$);
}

export default intent;

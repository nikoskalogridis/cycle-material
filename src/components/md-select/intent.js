/*jslint
    es6
*/

import xs from "xstream";

function intent({DOM, props}) {
    const props$ = !!props
        ? props.map(function (props) {
            return {
                type: "PROPS",
                props
            };
        })
        : undefined;

    const clickAction$ = DOM
        .select("input")
        .events("click")
        .mapTo({type: "CLICK"});

    const focusAction$ = DOM
        .select("input")
        .events("focus")
        .mapTo({type: "FOCUS"});

    const blurAction$ = DOM
        .select("input")
        .events("blur")
        .mapTo({type: "BLUR"});

    const changeAction$ = DOM
        .select("input")
        .events("change")
        .map(function (ev) {
            return {
                type: "CHANGE",
                data: ev.target.value
            };
        });

    const inputAction$ = DOM
        .select("input")
        .events("input")
        .map(function (ev) {
            return {
                type: "INPUT",
                data: ev.target.value
            };
        });

    const closeAction$ = DOM
        .select(".mask")
        .events("click")
        .map(function () {
            return {
                type: "CLOSE"
            };
        });

    const selectAction$ = DOM
        .select(".menu-item")
        .events("click")
        .map(function (ev) {
            console.log(ev.target);
            return {
                type: "SELECT",
                data: ev.target
            };
        });

    return xs.merge(
        clickAction$,
        focusAction$,
        blurAction$,
        changeAction$,
        inputAction$,
        closeAction$,
        selectAction$,
        props$
    );
}

export default intent;

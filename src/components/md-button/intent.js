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
        .select("button")
        .events("click")
        .mapTo({type: "CLICK"});

    return xs.merge(
        clickAction$,
        props$
    );
}

export default intent;

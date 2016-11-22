/*jslint
    es6
*/

import xs from "xstream";

function intent(DOMSource) {
    const clickAction$ = DOMSource
        .select("input")
        .events("click")
        .mapTo({type: "CLICK"});

    const closeAction$ = DOMSource
        .select(".mask")
        .events("click")
        .map(function () {
            return {
                type: "CLOSE"
            };
        });

    return xs.merge(clickAction$, closeAction$);
}

export default intent;

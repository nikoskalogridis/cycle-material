/*jslint
    es6
*/

function intent(DOMSource) {
    const clickAction$ = DOMSource
        .select("button.waves-button")
        .events("click")
        .mapTo({type: "CLICK"});

    return clickAction$;
}

export default intent;

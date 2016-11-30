/*jslint
    es6
*/

//import xs from "xstream";

function intent(ignore, events) {
    const events$ = events
        .cancelButton
        .map(function () {
            return {
                type: "CHANGE_LOCATION",
                href: "/buttons"
            };
        });

    return events$;
}

export default intent;

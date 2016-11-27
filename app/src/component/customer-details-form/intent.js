/*jslint
    es6
*/

import xs from "xstream";

function intent(sources, events) {
    //const DOMSource = sources.DOM;
    const customer$ = sources.customer
        .map(function (customer) {
            return {
                type: "CUSTOMER",
                customer: customer
            };
        });

    const events$ = events
        .map(function () {
            return {
                type: "CHANGE_LOCATION",
                href: "/buttons"
            };
        });

    return xs.merge(customer$, events$);
}

export default intent;

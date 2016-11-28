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
        .cancelButton
        .map(function () {
            return {
                type: "CHANGE_LOCATION",
                href: "/buttons"
            };
        });

    const firstNameChangeEvent$ = events
        .firstNameInput
        .map(function (event) {
            return {
                name: {
                    first: event.value
                }
            };
        });

    const lastNameChangeEvent$ = events
        .lastNameInput
        .map(function (event) {
            return {
                name: {
                    last: event.value
                }
            };
        });

    const emailChangeEvent$ = events
        .emailInput
        .map(function (event) {
            return {
                email: event.value
            };
        });

    const mobileChangeEvent$ = events
        .mobileInput
        .map(function (event) {
            return {
                phone: event.value
            };
        });

    const phoneChangeEvent$ = events
        .phoneInput
        .map(function (event) {
            return {
                phone2: event.value
            };
        });

    const genderChangeEvent$ = events
        .genderSelect
        .map(function (event) {
            return {
                gender: event.value
            };
        });

    const changeEvents$ = xs
        .merge(
            firstNameChangeEvent$,
            lastNameChangeEvent$,
            emailChangeEvent$,
            mobileChangeEvent$,
            phoneChangeEvent$,
            genderChangeEvent$
        ).map(function (payload) {
            return {
                type: "UPDATE",
                payload
            };
        });

    return xs.merge(customer$, events$, changeEvents$);
}

export default intent;

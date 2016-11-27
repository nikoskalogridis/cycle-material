/*jslint
    es6
*/

import validate from "validate.js";

var constraints = {
    name: {
        first: function (ignore, attributes) {
            if (attributes.name.last) {
                return null;
            }
            return {
                presense: {message: "either first or last name is required"}
            };
        },
        last: function (ignore, attributes) {
            if (attributes.name.first) {
                return null;
            }
            return {
                presense: {message: "either first or last name is required"}
            };
        }
    }
};

export default function validateCustomer(customer$) {
    return customer$
        .map((customer) => validate(customer, constraints));
}

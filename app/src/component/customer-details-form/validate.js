/*jslint
    es6
*/

import validate from "validate.js";

var constraints = {
    "name.first": function (ignore, attributes) {
        if (attributes.name.last) {
            return null;
        }
        return {
            presense: {message: "either first or last name is required"}
        };
    },
    "name.last": function (ignore, attributes) {
        if (attributes.name.first) {
            return null;
        }
        return {
            presense: {message: "either first or last name is required"}
        };
    },
    phone: {
        length: {
            is: 10,
            message: "Phone should be 10 digits"
        }
    }
};

export default function validateCustomer(customer) {
    return validate(customer, constraints);
}

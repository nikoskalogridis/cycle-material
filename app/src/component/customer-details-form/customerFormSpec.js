/*jslint
    es6
*/

import {mdInput, mdSelect} from "../../../../lib";

const formSpec = {
    "name.first": {
        component: {
            name: "firstNameInput",
            type: mdInput,
            value: "value",
            hasError: "isError",
            errorMessage: "message",
            initialState: {
                label: "First"
            }
        },
        constraints: function (ignore, attributes) {
            if (attributes.name.last) {
                return null;
            }
            return {
                presence: {message: "either first or last name is required"}
            };
        }
    },
    "name.last": {
        component: {
            name: "lastNameInput",
            type: mdInput,
            value: "value",
            hasError: "isError",
            errorMessage: "message",
            initialState: {
                label: "Last"
            }
        },
        constraints: function (ignore, attributes) {
            if (attributes.name.first) {
                return null;
            }
            return {
                presence: {message: "either first or last name is required"}
            };
        }
    },
    "email": {
        component: {
            name: "emailInput",
            type: mdInput,
            value: "value",
            hasError: "isError",
            errorMessage: "message",
            initialState: {
                label: "Email"
            }
        },
        constraints: {
            email: {
                message: "doesn't look like a valid email"
            }
        }
    },
    "phone": {
        component: {
            name: "mobileInput",
            type: mdInput,
            value: "value",
            hasError: "isError",
            errorMessage: "message",
            initialState: {
                label: "Mobile"
            }
        },
        constraints: {
            format: {
                pattern: /^(69\d{8})?$/,
                message: "should start with 69 and be 10 digits"
            }
        }
    },
    "phone2": {
        component: {
            name: "phoneInput",
            type: mdInput,
            value: "value",
            hasError: "isError",
            errorMessage: "message",
            initialState: {
                label: "Phone"
            }
        },
        constraints: {
            format: {
                pattern: /^(2\d{9})?$/,
                message: "should start with 2 and be 10 digits"
            }
        }
    },
    "gender": {
        component: {
            name: "genderSelect",
            type: mdSelect,
            value: "selected",
            hasError: "isError",
            errorMessage: "message",
            initialState: {
                label: "Gender",
                options: [
                    {value: "MALE", label: "Male"},
                    {value: "FEMALE", label: "Female"},
                    {value: "UNKNOWN", label: ""}
                ]
            }
        }
    }
};

export {formSpec};
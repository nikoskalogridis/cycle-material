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
            length: {
                is: 10,
                message: "should be 10 digits"
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
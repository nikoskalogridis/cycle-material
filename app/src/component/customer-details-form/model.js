/*jslint
    es6
*/

//import lodash from "lodash";
import xs from "xstream";
import deepAssign from "deep-assign";
import validate from "./validate";

function actionFilter(type) {
    return function (action) {
        return action.type === type;
    };
}

function stateToCustomer(state) {
    return {
        name: {
            first: state.firstNameInput.value,
            last: state.lastNameInput.value
        },
        email: state.emailInput.value,
        phone: state.mobileInput.value,
        phone2: state.phoneInput.value,
        gender: state.genderSelect.value
    };
}

function customerToState(customer) {
    return {
        firstNameInput: {
            value: customer.name.first
        },
        lastNameInput: {
            value: customer.name.last
        },
        emailInput: {
            value: customer.email
        },
        mobileInput: {
            value: customer.phone
        },
        phoneInput: {
            value: customer.phone2
        }
        // genderSelect: {
        //     text: customer.gender
        // }
    };
}

function validationErrorsToState(validationErrors) {
    if (!validationErrors) {
        return {
            mobileInput: {
                isError: false,
                message: ""
            }
        };
    }
    if (validationErrors.phone) {
        return {
            mobileInput: {
                isError: true,
                message: validationErrors.phone[0]
            }
        }
    }
    return {};
}

function model(action$) {
    // const saveReducer$ = saveButtonActions$
    //     .filter(actionFilter("CLICK"))
    //     .map((action) => function saveFunction(prevState) {
    //         return prevState;
    //     });
    const defaultReducer$ = xs.of(
        function defaultReducer(prevState) {
            if (prevState) {
                return prevState;
            }
            return deepAssign(
                {},
                prevState,
                {
                    firstNameInput: {
                        label: "First"
                    },
                    lastNameInput: {
                        label: "Last"
                    },
                    emailInput: {
                        label: "Email"
                    },
                    mobileInput: {
                        label: "Mobile"
                    },
                    phoneInput: {
                        label: "Phone"
                    },
                    saveButton: {
                        text: "Save",
                        flat: true
                    },
                    cancelButton: {
                        text: "Cancel",
                        flat: true,
                        style: {"margin-left": "1em"}
                    },
                    genderSelect: {
                        label: "Gender",
                        options: [
                            {value: "male", label: "Male"},
                            {value: "female", label: "Female"}
                        ],
                        selected: {value: "male", label: "Male"}
                    }
                }
            );
        }
    );

    const customerReducer$ = action$
        .filter(actionFilter("CUSTOMER"))
        .map((action) => function customerReducer(prevState) {
            const customer = action.customer;
            return deepAssign(
                {},
                prevState,
                customerToState(customer),
                {
                    saveButton: {
                        enabled: false
                    },
                    dirty: false,
                    valid: true
                }
            );
        });

    const router$ = action$
        .filter(actionFilter("CHANGE_LOCATION"))
        .map((action) => action.href);

    const updateCustomerReducer$ = action$
        .filter(actionFilter("UPDATE"))
        .map((action) => function updateCustomerReducer(prevState) {
            const customer = deepAssign(stateToCustomer(prevState), action.payload);
            const validationErrors = validate(customer);
            return deepAssign(
                {},
                prevState,
                customerToState(customer),
                validationErrorsToState(validationErrors),
                {
                    saveButton: {
                        enabled: true
                    },
                    dirty: true,
                    valid: true
                }
            );
        });

    return {
        reducers: xs.merge(
            defaultReducer$,
            customerReducer$,
            updateCustomerReducer$
        ),
        router: router$
    };
}

export default model;

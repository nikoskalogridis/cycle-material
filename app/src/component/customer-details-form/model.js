/*jslint
    es6
*/

//import lodash from "lodash";
import xs from "xstream";
//import validate from "./validate";

function actionFilter(type) {
    return function (action) {
        return action.type === type;
    };
}

function model(action$) {
    // const saveReducer$ = saveButtonActions$
    //     .filter(actionFilter("CLICK"))
    //     .map((action) => function saveFunction(prevState) {
    //         return prevState;
    //     });
    const defaultReducer$ = xs
        .fromPromise(
            Promise.resolve(
                function defaultReducer(prevState) {
                    return Object.assign(
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
            )
        );

    const customerReducer$ = action$
        .filter(actionFilter("CUSTOMER"))
        .map((action) => function customerReducer(prevState) {
            const customer = action.customer;
            return Object.assign(
                {},
                prevState,
                {
                    firstNameInput: {
                        text: customer.name.first
                    },
                    lastNameInput: {
                        text: customer.name.last
                    },
                    emailInput: {
                        text: customer.email
                    },
                    mobileInput: {
                        text: customer.phone
                    },
                    phoneInput: {
                        text: customer.phone2
                    },
                    // genderSelect: {
                    //     text: customer.gender
                    // },
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

    return {
        reducers: xs.merge(
            defaultReducer$,
            customerReducer$
        ),
        router: router$
    };
}

export default model;

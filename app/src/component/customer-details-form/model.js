/*jslint
    es6
*/

//import lodash from "lodash";
import xs from "xstream";
import deepAssign from "deep-assign";
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
    const defaultReducer$ = xs.of(
        function defaultReducer(prevState) {
            if (prevState) {
                return prevState;
            }
            const state = deepAssign(
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
            console.log(state);
            return state;
        }
    );

    const customerReducer$ = action$
        .filter(actionFilter("CUSTOMER"))
        .map((action) => function customerReducer(prevState) {
            const customer = action.customer;
            const state = deepAssign(
                {},
                prevState,
                {
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
            console.log(state);
            return state;
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

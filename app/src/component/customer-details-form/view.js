/*jslint
    es6
*/

import {div} from "@cycle/dom";
import {appbar, icon, calendar, col, row, paper} from "../../../../lib";
import xs from "xstream";

function view(state$, inputFieldDOMs) {
    const inputFieldArray = Object.keys(inputFieldDOMs).map(function (key) {
        return inputFieldDOMs[key];
    });


    return xs
        .combine(state$, ...inputFieldArray)
        .map(function (data) {
            const [state, ...inputs] = data;
            const inputFields = Object.keys(inputFieldDOMs).reduce(function (c, key, index) {
                c[key] = inputs[index];
                return c;
            }, {});
            const {
                firstNameInput,
                lastNameInput,
                emailInput,
                saveButton,
                cancelButton,
                mobileInput,
                phoneInput,
                genderSelect
            } = inputFields;

            return div(
                [
                    appbar(
                        {},
                        [
                            appbar.button({style: {float: "left"}}, [icon({name: "menu"})]),
                            appbar.title({}, "Customers"),
                            div(
                                {
                                    style: {float: "right"}
                                },
                                [
                                    appbar.button({href: "https://github.com/garth/snabbdom-material"}, "test")
                                ]
                            )
                        ]
                    ),
                    div(
                        {style: {"margin-top": "12px"}},
                        [
                            //row({}, [col({type: "md-3 md-offset-4"}, [paper({}, [calendar({})])])]),
                            row(
                                {},
                                [
                                    col({type: "md-5 md-offset-1"}, [genderSelect])
                                ]
                            ),
                            // select(
                            //     {
                            //         label: "gender",
                            //         options: [
                            //             {value: 0, label: "Male"},
                            //             {value: 1, label: "Female"}
                            //         ],
                            //         selected: {value: 0, label: "Male"}
                            //     }
                            // ),
                            row(
                                {},
                                [
                                    col({type: "md-5 md-offset-1"}, [firstNameInput]),
                                    col({type: "md-5"}, [lastNameInput])
                                ]
                            ),
                            row(
                                {},
                                [
                                    col({type: "md-10 md-offset-1"}, [emailInput])
                                ]
                            ),
                            row(
                                {},
                                [
                                    col({type: "md-5 md-offset-1"}, [mobileInput]),
                                    col({type: "md-5"}, [phoneInput])
                                ]
                            ),
                            row(
                                {},
                                [
                                    col(
                                        {type: "md-10 md-offset-1"},
                                        [
                                            saveButton,
                                            cancelButton
                                        ]
                                    )
                                ]
                            )
                        ]
                    )
                ]
            );
        });
}

export default view;

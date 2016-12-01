/*jslint
    es6
*/

import {div} from "@cycle/dom";
import {appbar, icon, col, row, paper} from "../../../../lib";
import {combineStreamsObject} from "../../helpers/utils";

function customerFormFields(components) {
    const {
        firstNameInput,
        lastNameInput,
        emailInput,
        saveButton,
        cancelButton,
        mobileInput,
        phoneInput,
        genderSelect
    } = components;

    return div(
        [
            row(
                {},
                [
                    col({type: "sm-6"}, [genderSelect])
                ]
            ),
            row(
                {},
                [
                    col({type: "sm-6"}, [firstNameInput]),
                    col({type: "sm-6"}, [lastNameInput])
                ]
            ),
            row(
                {},
                [
                    col({type: "sm-12"}, [emailInput])
                ]
            ),
            row(
                {},
                [
                    col({type: "sm-6"}, [mobileInput]),
                    col({type: "sm-6"}, [phoneInput])
                ]
            ),
            row(
                {},
                [
                    col(
                        {type: "sm-12"},
                        [
                            saveButton,
                            cancelButton
                        ]
                    )
                ]
            )
        ]
    );
}

function view(state, inputFieldDOMs) {
    state = Object.assign({}, {state}, inputFieldDOMs);
    return combineStreamsObject(state)
        .map(function (state) {
            return div(
                [
                    appbar(
                        {fixed: true},
                        [
                            appbar.button({style: {float: "left"}}, [icon({name: "menu"})]),
                            appbar.title({}, "Customers"),
                            div(
                                {
                                    style: {float: "right"}
                                },
                                [
                                    appbar.button({href: "https://github.com/nikoskalogridis/cycle-material"}, [icon({name: "github"})])
                                ]
                            )
                        ]
                    ),
                    div(
                        ".main",
                        [
                            row(
                                {},
                                [
                                    col(
                                        {type: "sm-10 sm-offset-1"},
                                        [
                                            paper(
                                                {},
                                                [
                                                    customerFormFields(state)
                                                ]
                                            )
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

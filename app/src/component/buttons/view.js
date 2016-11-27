/*jslint
    es6
*/

import {div, span} from "@cycle/dom";
import {appbar, icon, calendar, col, row, paper} from "../../../../lib";
import xs from "xstream";

function customerFormFields(components) {
    const {
        defaultFlatButton,
        primaryFlatButton,
        secondaryFlatButton,
        defaultRaisedButton,
        primaryRaisedButton,
        secondaryRaisedButton,
        defaultFlatButtonDisabled,
        primaryFlatButtonDisabled,
        secondaryFlatButtonDisabled,
        defaultRaisedButtonDisabled,
        primaryRaisedButtonDisabled,
        secondaryRaisedButtonDisabled
    } = components;

    return div(
        [
            row(
                {
                    style: {
                        "margin-top": "1em"
                    }
                },
                [
                    col(
                        {type: "sm-12"},
                        [
                            span({style: {"min-width": "10em", "display": "inline-block"}}, "Flat (enabled): "),
                            defaultFlatButton,
                            primaryFlatButton,
                            secondaryFlatButton
                        ]
                    )
                ]
            ),
            row(
                {
                    style: {
                        "margin-top": "1em"
                    }
                },
                [
                    col(
                        {type: "sm-12"},
                        [
                            span({style: {"min-width": "10em", "display": "inline-block"}}, "Flat (disabled): "),
                            defaultFlatButtonDisabled,
                            primaryFlatButtonDisabled,
                            secondaryFlatButtonDisabled
                        ]
                    )
                ]
            ),
            row(
                {
                    style: {
                        "margin-top": "1em"
                    }
                },
                [
                    col(
                        {type: "sm-12"},
                        [
                            span({style: {"min-width": "10em", "display": "inline-block"}}, "Raised (enabled): "),
                            defaultRaisedButton,
                            primaryRaisedButton,
                            secondaryRaisedButton
                        ]
                    )
                ]
            ),
            row(
                {
                    style: {
                        "margin-top": "1em"
                    }
                },
                [
                    col(
                        {type: "sm-12"},
                        [
                            span({style: {"min-width": "10em", "display": "inline-block"}}, "Raised (disabled): "),
                            defaultRaisedButtonDisabled,
                            primaryRaisedButtonDisabled,
                            secondaryRaisedButtonDisabled
                        ]
                    )
                ]
            )
        ]
    );
}

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

            return div(
                [
                    appbar(
                        {fixed: true},
                        [
                            appbar.button({style: {float: "left"}}, [icon({name: "menu"})]),
                            appbar.title({}, "Buttons"),
                            div(
                                {
                                    style: {float: "right"}
                                },
                                [
                                    appbar.button({href: "/"}, [icon({name: "github"})])
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
                                                    customerFormFields(inputFields)
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

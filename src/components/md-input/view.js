/*jslint
    es6
*/

import h from "snabbdom/h";
import {getStyle} from "../../style";

function input({isFocused, isError, isSuccess, label, message, readOnly, style, type, value}) {
    const styles = getStyle("input", style);
    const labelColor = {
        color: isError
            ? styles.errorColor
            : isSuccess
                ? styles.successColor
                : styles.labelColor
    };

    return (
        h(
            "div",
            {
                style: styles.container
            },
            [
                h(
                    "input",
                    {
                        style: styles.input,
                        props: {
                            type,
                            value,
                            readOnly,
                            required: true
                        }
                    }
                ),
                h(
                    "span",
                    {
                        style: Object.assign(
                            {
                                backgroundColor: labelColor.color
                            },
                            styles.bar,
                            (isError || isSuccess || isFocused)
                                ? styles.barFocused
                                : {}
                        )
                    }
                ),
                h(
                    "label",
                    {
                        style: Object.assign(
                            {},
                            styles.label,
                            !isFocused
                                ? {}
                                : labelColor,
                            (isFocused || value)
                                ? styles.labelFocused
                                : {}
                        )
                    },
                    label
                ),
                h(
                    "div",
                    {
                        style: Object.assign(
                            {},
                            styles.message,
                            {
                                color: isError
                                    ? styles.errorColor
                                    : ""
                            }
                        )
                    },
                    message
                )
            ]
        )
    );
}

function view(state$) {
    return state$.map(input);
}

export default view;



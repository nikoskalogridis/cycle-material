/*jslint
    es6
*/

import h from "snabbdom/h";
import {getStyle} from "../style";

export default function input(options) {
    const {
        isFocused,
        isError,
        isSuccess,
        label,
        message,
        onChange,
        onClick,
        onFocus,
        onBlur,
        readOnly,
        style,
        type,
        value
    } = Object.assign(
        {
            readOnly: false,
            type: "text",
            value: ""
        },
        options
    );
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
                        on: {
                            click: (e) => onClick
                                ? onClick(e)
                                : null,
                            focus: (e) => onFocus
                                ? onFocus(e)
                                : null,
                            blur: (e) => onBlur
                                ? setTimeout(() => onBlur(e), 0)
                                : null,
                            input: (e) => onChange
                                ? onChange(e)
                                : null
                        },
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

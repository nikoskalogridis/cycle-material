/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../style";
import moment from "moment";
import dialog from "./dialog";
import calendar from "./calendar";

export default function datePicker(options) {
    const {
        isOpen,
        locale,
        month,
        onCancel,
        onChange,
        onNavigate,
        onOk,
        pickingValue,
        screenInfo,
        style,
        validDays,
        year
    } = Object.assign(
        {
            isOpen: false,
            locale: "en",
            month: (new Date()).getMonth(),
            year: (new Date()).getFullYear()
        },
        options
    );
    const styles = getStyle("datepicker", style);
    const {isPortrait} = screenInfo;
    const displayDate = pickingValue
        ? moment(pickingValue)
        : moment({year, month, day: 1});
    displayDate.locale(locale);

    const dateLines = !pickingValue
        ? [displayDate.format("MMM")]
        : isPortrait
            ? [displayDate.format("ddd MMM D")]
            : [
                displayDate.format("ddd"),
                displayDate.format("MMM D")
            ];

    return dialog(
        {
            isOpen,
            footer: h("span", {}, [
                dialog.button({
                    flat: true,
                    onClick: onCancel
                }, "Cancel"),
                dialog.button({
                    flat: true,
                    primary: true,
                    onClick: pickingValue
                        ? () => onOk({target: {value: pickingValue}})
                        : null
                }, "OK")
            ]),
            width: isPortrait
                ? styles.portraitWidth
                : styles.landscapeWidth,
            height: isPortrait
                ? styles.portraitHeight
                : styles.landscapeHeight,
            hideDivider: true,
            noPadding: true,
            screenInfo,
            style: styles.datepicker
        },
        [
            h(
                "div",
                {
                    style: Object.assign(
                        {},
                        styles.title,
                        isPortrait
                            ? styles.titlePortrait
                            : styles.titleLandscape
                    )
                },
                [
                    h(
                        "div",
                        {
                            style: styles.titleYear
                        },
                        displayDate.get("year")
                    ),
                    h(
                        "div",
                        {
                            style: styles.titleDate
                        },
                        dateLines.map((line) => h("div", {}, line))
                    )
                ]
            ),
            calendar(
                {
                    locale,
                    month,
                    onChange,
                    onNavigate,
                    validDays,
                    value: pickingValue,
                    year,
                    style: isPortrait
                        ? styles.calendarPortrait
                        : styles.calendarLandscape
                }
            )
        ]
    );
}

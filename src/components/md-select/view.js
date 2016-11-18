/*jslint
    es6
*/

import h from "snabbdom/h";
import {getStyle} from "../../style";
import merge from "deepmerge";
import input from "../input";
import menu from "../menu";

function select({isError, isOpen, isSuccess, label, message, options, readOnly, screenInfo, selected, style, value}) {
    const styles = getStyle("select", style);
    let selectedIndex = 0;
    let displayValue = "";
    const menuItems = options.map(function (option, index) {
        const isSelected = (selected && option.label === selected.label) || (value !== null && option.value === value);
        if (!selectedIndex && isSelected) {
            selectedIndex = index;
            displayValue = option.label;
        }
        return menu.item(
            {
                style: isSelected
                    ? styles.selected
                    : null
            },
            option.label
        );
    });

    const top = styles.menuTopOffset - (selectedIndex * styles.menuItemHeight);

    return h(
        "div",
        {
            style: styles.container
        },
        [
            menu(
                {
                    style: merge(
                        {
                            menu: {
                                top: `${top}px`
                            }
                        },
                        styles.menu
                    ),
                    isOpen: isOpen && !readOnly && !!menuItems,
                    screenInfo
                },
                menuItems
            ),
            h(
                "svg",
                {
                    attrs: {
                        fill: styles.dropDownIcon.color,
                        height: 24,
                        viewBox: "0 0 24 24",
                        width: 24
                    },
                    style: styles.dropDownIcon
                },
                [
                    h("path", {attrs: {d: "M7 10l5 5 5-5z"}}),
                    h("path", {attrs: {d: "M0 0h24v24H0z", fill: "none"}})
                ]
            ),
            input(
                {
                    style: styles.input,
                    isError,
                    isSuccess,
                    isFocused: isOpen,
                    label,
                    message,
                    readOnly,
                    value: `${displayValue}`
                }
            )
        ]
    );
}

function view(state$) {
    return state$.map(select);
}

export default view;



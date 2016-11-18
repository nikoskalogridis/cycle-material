/*jslint
    es6
*/
import h from "snabbdom/h";
import merge from "deepmerge";
import {getStyle} from "../style";
import input from "./input";
import menu from "./menu";

export default function select(props) {
    const {
        isError,
        isOpen,
        isSuccess,
        label,
        message,
        onChange,
        onClose,
        onOpen,
        options,
        readOnly,
        screenInfo,
        selected,
        style,
        value
    } = Object.assign(
        {
            isError: false,
            isOpen: false,
            isSuccess: false,
            label: "",
            message: "",
            options: [],
            readOnly: false,
            selected: false
        },
        props
    );
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
                    : null,
                onClick: () => onChange({target: option}),
                onClose: onClose
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
                    screenInfo,
                    onClose
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
                    onClick: onOpen,
                    readOnly,
                    value: `${displayValue}`
                }
            )
        ]
    );
}

/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../style";

export default function mask(options) {
    const {isOpen, dark, onClick, style} = Object.assign(
        {
            isOpen: false,
            dark: true
        },
        options
    );
    const styles = getStyle("mask", style);

    return isOpen
        ? h(
            "div",
            {
                style: Object.assign(
                    {},
                    styles.mask,
                    dark
                        ? styles.dark
                        : styles.transparent
                ),
                on: {
                    click: (e) => onClick
                        ? onClick(e)
                        : null
                }
            }
        )
        : h("span");
}

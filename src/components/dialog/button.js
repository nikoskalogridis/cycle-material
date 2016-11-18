/*jslint
    es6
*/
import {getStyle} from "../../style";
import button from "../button";

export default function dialogButton(props, children = "") {
    const styles = getStyle("dialog");

    if (!props.style) {
        props.style = {};
    }
    if (!props.style.button) {
        props.style.button = styles.button;
    } else {
        props.style.button = Object.assign({}, styles.button, props.style.button);
    }

    return button(props, children);
}

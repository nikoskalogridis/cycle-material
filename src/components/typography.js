/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../style";

export default function typography(props, children = "") {
    const {
        display3,
        display2,
        display1,
        headline,
        title,
        subheading,
        caption,
        primary,
        secondary,
        style
    } = Object.assign(
        {
            display3: false,
            display2: false,
            display1: false,
            headline: false,
            title: false,
            subheading: false,
            caption: false,
            primary: false,
            secondary: false
        },
        props
    );
    const options = [];
    if (display3) {
        options.push("typ.display3");
    }
    if (display2) {
        options.push("typ.display2");
    }
    if (display1) {
        options.push("typ.display1");
    }
    if (headline) {
        options.push("typ.headline");
    }
    if (title) {
        options.push("typ.title");
    }
    if (subheading) {
        options.push("typ.subheading");
    }
    if (caption) {
        options.push("typ.caption");
    }
    if (primary) {
        options.push("typ.primary");
    }
    if (secondary) {
        options.push("typ.secondary");
    }
    return h(
        "div.typography",
        {
            style: Object.assign({}, ...options.map((name) => getStyle(name, style)))
        },
        children
    );
}

/*jslint
  es6
*/
import h from "snabbdom/h";

export default function col(options, children = "") {
    const {style, type} = Object.assign(
        {
            style: {},
            type: ""
        },
        options
    );
    const classNames = type.split(" ").map((col) => `col-${col}`).join(".");
    return h(
        `div.${classNames}`,
        {
            style
        },
        children
    );
}

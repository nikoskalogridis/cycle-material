/*jslint
    es6
*/
import h from "snabbdom/h";

export default function row(options, children = "") {
    const {style} = Object.assign({style: {}}, options);
    return h(
        "div.row",
        {
            style
        },
        children
    );
}

/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../style";

export default function form({onSubmit, style}, children = "") {
    const styles = getStyle("form", style);
    return h(
        "form",
        {
            style: styles,
            on: {
                submit: function (e) {
                    e.preventDefault();
                    if (typeof onSubmit === "function") {
                        onSubmit(e);
                    }
                }
            },
            props: {
                noValidate: true
            }
        },
        children
    );
}

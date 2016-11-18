/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../style";

export default function paper(options, children = "") {
    const {elevation, hook, noPadding, style} = Object.assign(
        {
            elevation: 1,
            noPadding: false
        },
        options
    );
    const styles = getStyle("paper", style);

    return h(
        "div",
        {
            hook,
            style: Object.assign(
                {},
                styles.paper,
                styles.elevation[elevation],
                noPadding
                    ? {}
                    : styles.padded
            )
        },
        children
    );
}

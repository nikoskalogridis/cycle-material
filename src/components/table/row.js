/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../../style";

export default function tableRow({onClick, style}, children = "") {
    const styles = getStyle("table", style);

    return h(
        "tr",
        {
            class: {
                clickable: onClick
            },
            style: Object.assign(
                {},
                styles.row,
                onClick
                    ? styles.rowClickable
                    : {}
            ),
            on: {
                click: (e) => onClick
                    ? onClick(e)
                    : null
            }
        },
        children
    );
}

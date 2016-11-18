/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../style";
import Waves from "./helpers/waves";

export default function checkbox(options) {
    const {label, onChange, readOnly, style, value} = Object.assign(
        {
            label: "",
            readOnly: false,
            value: false
        },
        options
    );
    const styles = getStyle("checkbox", style);

    const icon = value
        ? h(
            "svg",
            {
                attrs: {
                    fill: styles.iconSelected.color,
                    height: 24,
                    viewBox: "0 0 24 24",
                    width: 24
                }
            },
            [
                h("path", {attrs: {d: "M0 0h24v24H0z", fill: "none"}}),
                h("path", {attrs: {d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}})
            ]
        )
        : h(
            "svg",
            {
                attrs: {
                    fill: styles.icon.color,
                    height: 24,
                    viewBox: "0 0 24 24",
                    width: 24
                }
            },
            [
                h("path", {attrs: {d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}}),
                h("path", {attrs: {d: "M0 0h24v24H0z", fill: "none"}})
            ]
        );

    return h(
        "label",
        {
            style: styles.label
        },
        [
            h(
                "input",
                {
                    style: {
                        display: "none"
                    },
                    on: {
                        change: (e) => onChange({target: {value: e.target.checked}})
                    },
                    props: {
                        type: "checkbox",
                        readOnly,
                        checked: !!value
                    }
                }
            ),
            h(
                "div.waves-circle",
                {
                    hook: {
                        insert: (vnode) => Waves.attach(vnode.elm)
                    },
                    class: {
                        "waves-light": styles.lightWaves
                    },
                    style: Object.assign(
                        {},
                        styles.icon,
                        value
                            ? styles.iconSelected
                            : {}
                    )
                },
                [
                    icon
                ]
            ),
            label
        ]
    );
}

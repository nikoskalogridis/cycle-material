/*jslint
    es6
*/
import h from "snabbdom/h";
import Waves from "../helpers/waves";
import {getStyle} from "../../style";

export default function appbarButton(options, children) {
    const {onClick, href, style} = Object.assign(
        {
            href: ""
        },
        options
    );
    children = children || "";
    const styles = getStyle("appbar.button", style);
    const enabled = onClick || href;
    const elementType = href
        ? "a"
        : "div";

    return h(
        "div",
        {
            style: styles.container
        },
        [
            h(
                `${elementType}.waves-circle`,
                {
                    class: {
                        "waves-light": styles.lightWaves
                    },
                    hook: {
                        insert: (vnode) => enabled
                            ? Waves.attach(vnode.elm)
                            : null
                    },
                    on: {
                        click: (e) => onClick
                            ? onClick(e)
                            : null
                    },
                    props: {
                        href
                    },
                    style: Object.assign(
                        {},
                        styles.button,
                        enabled
                            ? styles.enabled
                            : styles.disabled
                    )
                },
                children
            )
        ]
    );
}

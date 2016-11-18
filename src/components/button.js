/*jslint
  es6
*/
import h from "snabbdom/h";
import {getStyle} from "../style";
import Waves from "./helpers/waves";

export default function button(options, children) {
    const {flat, onClick, primary, secondary, style, type, extraClass, enabled} = Object.assign(
        {
            flat: false,
            primary: false,
            secondary: false,
            type: "button",
            extraClass: {},
            enabled: true
        },
        options
    );
    children = children || "";
    const styles = getStyle("button", style);
    //const enabled = onClick || type === "submit";

    const key = flat
        ? "flat"
        : "raised";
    const allStyles = [
        styles.button,
        enabled
            ? styles[key].enabled
            : styles[key].disabled
    ];
    if (enabled && primary) {
        allStyles.push(styles[key].primary);
        if (style && style.button) {
            allStyles.push(style.button);
        }
    } else if (enabled && secondary) {
        allStyles.push(styles[key].secondary);
        if (style && style.button) {
            allStyles.push(style.button);
        }
    }

    return h(
        "button.waves-button",
        {
            hook: {
                insert: (vnode) => Waves.attach(vnode.elm)
            },
            on: {
                click: (e) => onClick
                    ? onClick(e)
                    : null
            },
            style: Object.assign({}, ...allStyles),
            class: Object.assign(
                {},
                extraClass,
                {
                    "waves-float": !flat && enabled,
                    "waves-light":
                            !flat &&
                            ((!primary && !secondary && styles.lightWaves) ||
                            (primary && styles.primaryLightWaves) ||
                            (secondary && styles.secondaryLightWaves))
                }
            ),
            props: {
                type,
                disabled: !enabled
            }
        },
        children
    );
}

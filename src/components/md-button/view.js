/*jslint
    es6
*/

import h from "snabbdom/h";
import {getStyle} from "../../style";
import Waves from "../helpers/waves";

function button({flat, primary, secondary, style, type, enabled, text}) {
    const styles = getStyle("button", style);

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
            style: Object.assign({}, ...allStyles),
            class: {
                "waves-float": !flat && enabled,
                "waves-light":
                        !flat &&
                        ((!primary && !secondary && styles.lightWaves) ||
                        (primary && styles.primaryLightWaves) ||
                        (secondary && styles.secondaryLightWaves))
            },
            props: {
                type,
                disabled: !enabled
            }
        },
        text
    );
}

function view(state$) {
    return state$.map(button);
}

export default view;

/*jslint
    es6
*/

import h from "snabbdom/h";
import Waves from "../helpers/waves";

function button({flat, primary, secondary, style, classes, type, enabled, text}) {
    return h(
        "button",
        {
            hook: {
                insert: (vnode) => Waves.attach(vnode.elm)
            },
            style,
            class: Object.assign({}, classes || {}, {
                button: true,
                primary,
                secondary,
                raised: !flat,
                disabled: !enabled
            }),
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

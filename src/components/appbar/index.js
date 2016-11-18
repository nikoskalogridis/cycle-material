/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../../style";
import button from "./button";
import title from "./title";
import paper from "../paper";

const appbar = function (options, children) {
    const {fixed, style} = Object.assign({fixed: false}, options);
    children = children || "";
    const styles = getStyle("appbar.appbar", style);

    return h(
        "div",
        {
            style: styles.container
        },
        [
            paper(
                {
                    noPadding: true,
                    elevation: 1,
                    style: {
                        paper: Object.assign({
                            position: fixed
                                ? "fixed"
                                : ""
                        }, styles.appbar)
                    }
                },
                children
            )
        ]
    );
};

appbar.button = button;
appbar.title = title;

export default appbar;

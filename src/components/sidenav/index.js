/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../../style";
import mask from "../mask";
import item from "./item";
import title from "./title";
import paper from "../paper";
import separator from "../menu/separator";

const sidenav = function (options, children = "") {
    const {isOpen, mini, onClose, style} = Object.assign(
        {
            isOpen: false,
            mini: false
        },
        options
    );
    const styles = getStyle("sidenav", style);

    return mini
        ? paper(
            {
                noPadding: true,
                style: {
                    paper: styles.mini
                }
            },
            children
        )
        : h(
            "div",
            {
                style: styles.container
            },
            [
                mask(
                    {
                        onClick: onClose,
                        isOpen
                    }
                ),
                ...(isOpen
                    ? [
                        paper(
                            {
                                noPadding: true,
                                elevation: 2,
                                style: {
                                    paper: styles.sidenav
                                }
                            },
                            children
                        )
                    ]
                    : [])
            ]
        );
};

sidenav.item = item;
sidenav.separator = separator;
sidenav.title = title;

export default sidenav;

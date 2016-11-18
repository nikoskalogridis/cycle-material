/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../../style";
import mask from "../mask";
import paper from "../paper";
import item from "./item";
import separator from "./separator";
import getScreenSize from "../../helpers/screenSize";

const insert = (styles) => function (vnode) {
    const {height: screenHeight} = getScreenSize();
    const {top, bottom} = vnode.elm.getBoundingClientRect();
    const originalHeight = bottom - top;
    const minHeight = (styles.menuItemHeight * 8) + (styles.menuTopPadding * 2);

    let offsetTop = top < 6
        ? Math.ceil((top - 16) / (styles.menuItemHeight * -1)) * styles.menuItemHeight
        : 0;
    const offsetBottom = bottom > screenHeight - 6
        ? Math.ceil((bottom - screenHeight + 16) / styles.menuItemHeight) * styles.menuItemHeight
        : 0;
    let height = bottom - top - offsetTop - offsetBottom;
    if (height < minHeight) {
        height = minHeight > originalHeight
            ? originalHeight
            : minHeight;
        if (top + offsetTop + height + 16 > screenHeight) {
            offsetTop -= top + offsetTop + height + 16 - screenHeight;
        }
    }
    vnode.elm.style.top = `${vnode.elm.offsetTop + offsetTop}px`;
    vnode.elm.style.height = `${height}px`;
    vnode.elm.scrollTop += offsetTop;
};

const menu = function (options, children = "") {
    const {isOpen, onClick, rightAlign, style} = Object.assign(
        {
            isOpen: false,
            rightAlign: false
        },
        options
    );
    const styles = getStyle("menu", style);
    const menuStyle = rightAlign
        ? {
            right: "0"
        }
        : {};

    return h(
        "div",
        {
            style: styles.container
        },
        [
            mask(
                {
                    dark: false,
                    isOpen,
                    onClick
                }
            ),
            ...(isOpen
                ? [
                    paper(
                        {
                            noPadding: true,
                            elevation: 1,
                            hook: {
                                insert: insert(styles)
                            },
                            style: {
                                paper: Object.assign(menuStyle, styles.menu)
                            }
                        },
                        children
                    )
                ]
                : [])
        ]
    );
};

menu.item = item;
menu.separator = separator;

export default menu;

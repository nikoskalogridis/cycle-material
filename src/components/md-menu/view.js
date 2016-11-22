/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../../style";
import mask from "../mask";
import paper from "../paper";
import divider from "../divider";
import getScreenSize from "../../helpers/screenSize";
import Waves from "../helpers/waves";

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

function menuItem({icon, selected, showIcon, label, id}, styles) {
    let iconContainer = null;
    if (showIcon) {
        const iconElement = selected
            ? h(
                "svg",
                {
                    attrs: {
                        fill: styles.icon.color,
                        height: 24,
                        viewBox: "0 0 24 24",
                        width: 24
                    },
                    style: styles.icon
                },
                [
                    h("path", {attrs: {d: "M0 0h24v24H0z", fill: "none"}}),
                    h("path", {attrs: {d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}})
                ]
            )
            : icon;
        iconContainer = [
            h("div", {style: styles.iconContainer}, [iconElement || "\u00A0"])
        ];
    } else {
        iconContainer = [];
    }

    return h(
        "div.menu-item",
        {
            hook: {
                insert: (vnode) => Waves.attach(vnode.elm)
            },
            style: styles.item,
            data: {
                "menuItemId": id
            }
        },
        [
            ...iconContainer,
            h(
                "div",
                {
                    style: styles.itemText
                },
                label
            )
        ]
    );
}

function itemNodes(items, styles) {
    return items.map(function (item) {
        if (item.separator) {
            return divider({
                style: {
                    divider: styles.separator
                }
            });
        }
        return menuItem(item, styles);
    });
}

function menu({isOpen, rightAlign, style, items}) {
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
                    isOpen
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
                        itemNodes(items, styles)
                    )
                ]
                : [])
        ]
    );
}

function view(state$) {
    return state$.map(menu);
}

export default view;

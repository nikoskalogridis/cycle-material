/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../../style";
import mask from "../mask";
import paper from "../paper";
import divider from "../divider";
import getScreenSize from "../../helpers/screenSize";
import button from "./button";

const dialog = function (options, children = "") {
    const {footer, height, hideDivider, isOpen, noPadding, style, title, width} = Object.assign(
        {
            height: 130,
            hideDivider: false,
            isOpen: false,
            noPadding: false,
            width: 280
        },
        options
    );
    const styles = getStyle("dialog", style);
    const screenSize = getScreenSize();

    let top = (screenSize.height / 2) - (height / 2);
    top = top < 24
        ? 24
        : top;
    const maxWidth = width > screenSize.width - 80
        ? screenSize.width - 80
        : width;
    const left = (screenSize.width - maxWidth) / 2;
    const maxHeight = screenSize.height - 48;
    let maxContentHeight = maxHeight - 48;

    let footerContainer = null;
    if (footer) {
        footerContainer = h(
            "div",
            {
                style: styles.footerContainer
            },
            [
                ...(hideDivider
                    ? []
                    : [
                        divider(
                            {
                                style: {
                                    divider: styles.divider
                                }
                            }
                        )
                    ]),
                footer
            ]
        );
        maxContentHeight -= 56;
    } else {
        footerContainer = h("span");
    }

    let titleContainer;
    if (title) {
        titleContainer = [
            h(
                "div",
                {
                    style: Object.assign(
                        {},
                        styles.titleContainer,
                        children
                            ? {}
                            : styles.titleContainerNoContent
                    )
                },
                typeof title === "string"
                    ? title
                    : [title]
            )
        ];
        maxContentHeight -= 49;
    } else {
        titleContainer = [];
    }

    return h(
        "div",
        {
            style: styles.container
        },
        [
            mask({isOpen}),
            ...(isOpen
                ? [
                    paper(
                        {
                            elevation: 2,
                            noPadding: true,
                            style: {
                                paper: Object.assign(
                                    {
                                        top: `${top}px`,
                                        left: `${left}px`,
                                        width: `${maxWidth}px`,
                                        maxHeight: `${maxHeight}px`
                                    },
                                    styles.dialog
                                )
                            }
                        },
                        [
                            h(
                                "div",
                                {
                                    style: {
                                        padding: noPadding
                                            ? "0"
                                            : "24px"
                                    }
                                },
                                [
                                    ...titleContainer,
                                    h(
                                        "div",
                                        {
                                            style: Object.assign(
                                                {
                                                    maxHeight: `${maxContentHeight}px`
                                                },
                                                styles.bodyContainer
                                            )
                                        },
                                        children
                                    )
                                ]
                            ),
                            footerContainer
                        ]
                    )
                ]
                : [])
        ]
    );
};

dialog.button = button;

export default dialog;

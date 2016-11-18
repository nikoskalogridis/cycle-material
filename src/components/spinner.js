/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../style";
import paper from "./paper";

export default function spinner(options) {
    const {
        inline,
        isOpen,
        primary,
        secondary,
        size,
        style
    } = Object.assign(
        {
            isOpen: false,
            primary: false,
            secondary: false,
            size: 30
        },
        options
    );
    const styles = getStyle("spinner", style);

    const spinnerEl = h(
        "div",
        {
            style: Object.assign(
                {
                    width: `${size}px`,
                    height: `${size}px`
                },
                styles.container
            )
        },
        [
            h(
                "svg",
                {
                    style: {
                        animation: "spinner-rotate 2s linear infinite",
                        position: "relative",
                        zoom: `${size / 100}`,
                        width: "100px",
                        height: "100px"
                    }
                },
                [
                    h(
                        "circle",
                        {
                            attrs: {
                                fill: "none",
                                stroke: primary
                                    ? styles.primaryColor
                                    : secondary
                                        ? styles.secondaryColor
                                        : null,
                                cx: 50,
                                cy: 50,
                                r: 48,
                                "stroke-width": styles.strokeWidth,
                                "stroke-miterlimit": 10
                            },
                            style: {
                                strokeDasharray: "1,400",
                                strokeDashoffset: "0",
                                animation: "spinner-dash 1.5s ease-in-out infinite" +
                                        (!primary && !secondary)
                                    ? ", spinner-color 6s ease-in-out infinite"
                                    : "",
                                strokeLinecap: "round"
                            }
                        }
                    )
                ]
            )
        ]
    );

    return inline
        ? spinnerEl
        : isOpen
            ? paper(
                {
                    noPadding: true,
                    elevation: 1,
                    style: {
                        paper: Object.assign({
                            marginLeft: `-${(size / 2) + styles.padding}px`,
                            width: `${size + (styles.padding * 2)}px`,
                            height: `${size + (styles.padding * 2)}px`,
                            padding: `${styles.padding}px`
                        }, styles.overlay)
                    }
                },
                [
                    spinnerEl
                ]
            )
            : h("span");
}

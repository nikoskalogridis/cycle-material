/*jslint
    es6
*/
import h from "snabbdom/h";

export default function tableToolbar(options, children = "") {
    const {colSpan, style} = Object.assign(
        {
            colSpan: 1
        },
        options
    );

    return h(
        "tr.toobar",
        {},
        [
            h(
                "th",
                {
                    props: {
                        colSpan
                    },
                    style: Object.assign(
                        {
                            paddingLeft: "0"
                        },
                        style
                    )
                },
                children
            )
        ]
    );
}

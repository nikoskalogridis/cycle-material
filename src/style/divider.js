/*jslint
    es6
*/
import paper from "./paper";

export default function (variables) {
    return {
        divider: Object.assign({
            border: "0",
            height: "1px",
            margin: "16px 0"
        }, paper(variables).divider)
    };
}

/*jslint
    es6
*/
import h from "snabbdom/h";
import {getStyle} from "../../style";
import toolbar from "./toolbar";
import row from "./row";

const table = function ({style}, children = "") {
    const styles = getStyle("table", style);

    return h(
        "table.material-table",
        {
            style: styles.table
        },
        children
    );
};

table.toolbar = toolbar;
table.row = row;

export default table;

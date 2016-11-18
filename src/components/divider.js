/*jslint
  es6
*/
import h from "snabbdom/h";
import {getStyle} from "../style";

export default function divider({style}) {
    const styles = getStyle("divider", style);

    return h(
        "hr",
        {
            style: styles.divider
        }
    );
}

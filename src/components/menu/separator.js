/*jslint
    es6
*/
import {getStyle} from "../../style";
import divider from "../divider";

export default function menuSeparator({style}) {
    const styles = getStyle("menu", style);
    return divider({
        style: {
            divider: styles.separator
        }
    });
}

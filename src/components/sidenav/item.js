/*jslint
    es6
*/
import {getStyle} from "../../style";
import menuItem from "../menu/item";

export default function sidenavItem(options, children = "") {
    const {icon, onClick, onClose, selected, showIcon, style} = Object.assign(
        {
            selected: false,
            showIcon: false
        },
        options
    );
    const styles = getStyle("sidenav", style);

    return menuItem(
        {
            icon,
            onClick,
            onClose,
            selected: false,
            showIcon,
            style: {
                item: Object.assign(
                    {},
                    styles.item,
                    selected
                        ? styles.itemSelected
                        : {}
                )
            }
        },
        children
    );
}

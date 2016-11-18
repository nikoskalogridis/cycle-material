/*jslint
    es6
*/
import appbar from "./appbar";
import button from "./button";
import calendar from "./calendar";
import checkbox from "./checkbox";
import datepicker from "./datepicker";
import dialog from "./dialog";
import divider from "./divider";
import form from "./form";
import icon from "./icon";
import input from "./input";
import mask from "./mask";
import menu from "./menu";
import paper from "./paper";
import select from "./select";
import sidenav from "./sidenav";
import spinner from "./spinner";
import table from "./table";
import typography from "./typography";

export default function (variables) {
    const style = {
        appbar: appbar(variables),
        button: button(variables),
        calendar: calendar(variables),
        checkbox: checkbox(variables),
        datepicker: datepicker(variables),
        dialog: dialog(variables),
        divider: divider(variables),
        form: form(variables),
        icon: icon(variables),
        input: input(variables),
        mask: mask(variables),
        menu: menu(variables),
        paper: paper(variables),
        select: select(variables),
        sidenav: sidenav(variables),
        spinner: spinner(variables),
        table: table(variables),
        typ: typography(variables)
    };

    return Object.assign({
        rules: {
            body: Object.assign({
                fontFamily: "Roboto, Noto, sans-serif",
                WebkitFontSmoothing: "antialiased",
                WebkitTextSizeAdjust: "100%"
            }, style.typ.body),
            h1: style.typ.display3,
            h2: style.typ.display2,
            h3: style.typ.display1,
            h4: style.typ.headline,
            h5: style.typ.title
        }
    }, style);
}

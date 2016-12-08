/*jslint
    es6
*/

import xs from "xstream";
import {makeRouterDriver} from "cyclic-router";
import {createHistory} from "history";
import switchPath from "switch-path";
import {run} from "@cycle/xstream-run";
import {makeDOMDriver} from "@cycle/dom";
import CustomersDetailsForm from "./component/customer-details-form";
import ButtonsPage from "./component/buttons";
// load the css
import {} from "!style!css!../vendor/icomoon/style.css";

const customer = {
    name: {
        first: "",
        last: ""
    },
    gender: "",
    email: "",
    phone: ""
};

function main(sources) {
    const match$ = sources.router.define({
        "/": CustomersDetailsForm,
        "/buttons": ButtonsPage
    });

    const page$ = match$.map(function ({path, value}) {
        return value(Object.assign({customer: xs.from(Promise.resolve(customer))}, sources, {
            router: sources.router.path(path)
        }));
    });

    return {
        DOM: page$.map((c) => c.DOM).flatten(),
        router: page$.map((c) => c.router || xs.never()).flatten()
    };
}

run(
    main,
    {
        DOM: makeDOMDriver("#app"),
        router: makeRouterDriver(createHistory(), switchPath)
    }
);

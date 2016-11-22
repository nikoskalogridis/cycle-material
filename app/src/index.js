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
// load the css
import {} from "!style!css!../vendor/icomoon/style.css";

function main(sources) {
    const match$ = sources.router.define({
        "/": CustomersDetailsForm
    });

    const page$ = match$.map(function ({path, value}) {
        return value(Object.assign({}, sources, {
            router: sources.router.path(path)
        }));
    });

    return {
        DOM: page$.map((c) => c.DOM).flatten(),
        router: xs.of("/")
    };
}

run(
    main,
    {
        DOM: makeDOMDriver("#app"),
        router: makeRouterDriver(createHistory(), switchPath)
    }
);

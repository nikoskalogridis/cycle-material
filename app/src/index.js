/*jslint
    es6
*/

import {run} from "@cycle/xstream-run";
import {makeDOMDriver} from "@cycle/dom";
import CustomersDetailsForm from "./component/customer-details-form";
// load the css
import "!style!css!../vendor/icomoon/style.css";

const drivers = {
    DOM: makeDOMDriver("#app")
};

run(CustomersDetailsForm, drivers);

/*jslint
    es6
*/

import xs from "xstream";

function intent(DOMSource) {
    const addActions$ = DOMSource
        .select(".add-customer-action")
        .events("click")
        .mapTo(
            {
                type: "ADD",
                data: {
                    id: "34534223624254645",
                    name: {
                        full: "Nikos Kalogridis"
                    },
                    phone: "xxxx001001"
                }
            }
        );
    const refreshAction$ = DOMSource
        .select(".refresh-customers-action")
        .events("click")
        .mapTo({type: "REFRESH"});

    const deleteMultipleAction$ = DOMSource
        .select(".delete-multiple-customers-action")
        .events("click")
        .mapTo({type: "DELETE"});

    const searchFilter$ = DOMSource
        .select("#search_header_input")
        .events("input")
        .map(function (ev) {
            return {
                type: "SEARCH",
                payload: ev.target.value
            };
        });

    return xs.merge(addActions$, refreshAction$, deleteMultipleAction$, searchFilter$);
}

export default intent;

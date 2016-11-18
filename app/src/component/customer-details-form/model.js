/*jslint
    es6
*/

//import lodash from "lodash";
import xs from "xstream";
//import customers from "./customers.mock.json";

function actionFilter(type) {
    return function (action) {
        return action.type === type;
    };
}

function model(action$, saveButtonActions$) {
    const initialReducer$ = xs.of(function initialReducer() {
        return {
            filterFn: () => true,
            list: []
            // lodash(customers)
            //     .filter(function (customer) {
            //         return customer.entryType !== "walkin";
            //     })
            //     .map(function (customer) {
            //         return {
            //             id: customer._id,
            //             name: {
            //                 full: customer.name.first + " " + customer.name.last
            //             },
            //             phone: customer.phone
            //         };
            //     })
            //     .sortBy((customer) => customer.name.full)
            //     .take(100)
            //     .value()
        };
    });

    const addCustomerReducer$ = action$
        .filter(actionFilter("ADD"))
        .map((action) => function addCustomer(prevState) {
            return Object.assign(
                {},
                prevState,
                {
                    list: prevState.list.concat(action.data)
                }
            );
        });

    const refreshReducer$ = action$
        .filter(actionFilter("REFRESH"))
        .map(() => function refreshCustomers(prevState) {
            return Object.assign(
                {},
                prevState,
                {
                    filterFn: function (customer) {
                        return customer.phone && customer.phone.indexOf("694") === 0;
                    }
                }
            );
        });

    const deleteReducer$ = action$
        .filter(actionFilter("DELETE"))
        .map(() => function deleteCustomers(prevState) {
            return Object.assign(
                {},
                prevState,
                {
                    list: prevState.list.filter(function (customer) {
                        return !customer.selected;
                    })
                }
            );
        });

    const searchReducer$ = action$
        .filter(actionFilter("SEARCH"))
        .map((action) => function searchFilter(prevState) {
            return Object.assign(
                {},
                prevState,
                {
                    searchText: action.payload
                }
            );
        });

    const saveReducer$ = saveButtonActions$
        .filter(actionFilter("CLICK"))
        .map((action) => function saveFunction(prevState) {
            console.log(action);
            return prevState;
        });

    return xs.merge(
        initialReducer$,
        addCustomerReducer$,
        refreshReducer$,
        deleteReducer$,
        searchReducer$,
        saveReducer$
    );
}

export default model;

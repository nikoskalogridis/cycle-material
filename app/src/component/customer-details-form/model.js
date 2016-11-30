/*jslint
    es6
*/

import xs from "xstream";
import deepAssign from "deep-assign";
import {actionFilter} from "../../helpers/utils";

function model(action$) {
    // const saveReducer$ = saveButtonActions$
    //     .filter(actionFilter("CLICK"))
    //     .map((action) => function saveFunction(prevState) {
    //         return prevState;
    //     });

    const router$ = action$
        .filter(actionFilter("CHANGE_LOCATION"))
        .map((action) => action.href);

    const initReducer$ = xs.of(
        function initReducer(prevState) {
            return deepAssign(
                {},
                prevState,
                {
                    saveButton: {
                        text: "Save",
                        flat: true
                    },
                    cancelButton: {
                        text: "Cancel",
                        flat: true
                    }
                }
            );
        }
    );

    const modelChangeReducer$ = action$
        .filter(actionFilter("MODELCHANGE"))
        .map(function () {
            return function modelChangeReducer(prevState) {
                return deepAssign(
                    {},
                    prevState,
                    {
                        saveButton: {
                            enabled: prevState.dirty && prevState.valid
                        }
                    }
                );
            };
        });

    const reducers$ = xs.merge(
        initReducer$,
        modelChangeReducer$
    );

    return {
        reducers: reducers$,
        router: router$
    };
}

export default model;

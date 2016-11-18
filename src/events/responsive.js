/*jslint
    es6, browser
*/

import {canUseDOM} from "exenv";
import getScreenInfo from "../helpers/screenInfo";

var screenInfo = null;
const subscribers = {};
const window = document.defaultView;

function resize() {
    const screen = getScreenInfo();

    if (!screenInfo || screen.size !== screenInfo.size || screen.isLandscape !== screenInfo.isLandscape) {
        screenInfo = screen;
        Object.keys(subscribers).forEach(function (eventHandler) {
            return subscribers[eventHandler](screenInfo);
        });
    }
}

export default {
    addListener(eventHandler) {
        if (typeof eventHandler !== "function") {
            return;
        }
        if (!screenInfo) {
            if (canUseDOM) {
                window.addEventListener("resize", resize);
            }
            resize();
        }
        subscribers[eventHandler] = eventHandler;
        eventHandler(screenInfo);
    },

    removeListener(eventHandler) {
        delete subscribers[eventHandler];
    }
};

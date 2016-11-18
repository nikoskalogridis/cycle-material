/*jslint
  es6, browser
*/
import {canUseDOM} from "exenv";
const window = document.defaultView;

export default function screenSize() {
    return {
        width: (canUseDOM && (window.innerWidth || document.body.clientWidth)) || 1024,
        height: (canUseDOM && (window.innerHeight || document.body.clientHeight)) || 768
    };
}

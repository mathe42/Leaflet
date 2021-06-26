/*
 * @namespace Browser
 * @aka L.Browser
 *
 * A namespace with static properties for browser/feature detection used by Leaflet internally.
 *
 * @example
 *
 * ```js
 * if (L.Browser.ielt9) {
 *   alert('Upgrade your browser, dude!');
 * }
 * ```
 */

// @property ie: Boolean; `true` for all Internet Explorer versions (not Edge).
export var ie = false;

// @property ielt9: Boolean; `true` for Internet Explorer versions less than 9.
export var ielt9 = false;

// @property edge: Boolean; `true` for the Edge web browser.
export var edge = false;

// @property webkit: Boolean;
// `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
export var webkit = userAgentContains('webkit');

// @property android: Boolean
// `true` for any browser running on an Android platform.
export var android = userAgentContains('android');

// @property android23: Boolean; `true` for browsers running on Android 2 or Android 3.
export var android23 = false;

export var androidStock = false;

// @property opera: Boolean; `true` for the Opera browser
export var opera = false;

// @property chrome: Boolean; `true` for the Chrome browser.
export var chrome = userAgentContains('chrome');

// @property gecko: Boolean; `true` for gecko-based browsers like Firefox.
export var gecko = userAgentContains('gecko') && !webkit;

// @property safari: Boolean; `true` for the Safari browser.
export var safari = !chrome && userAgentContains('safari');

export var phantom = false;

// @property opera12: Boolean
// `true` for the Opera browser supporting CSS transforms (version 12 or later).
export var opera12 = false;

// @property win: Boolean; `true` when the browser is running in a Windows platform
export var win = navigator.platform.indexOf('Win') === 0;

// @property ie3d: Boolean; `true` for all Internet Explorer versions supporting CSS transforms.
export var ie3d = false;

// @property webkit3d: Boolean; `true` for webkit-based browsers supporting CSS transforms.
export var webkit3d = false;

// @property gecko3d: Boolean; `true` for gecko-based browsers supporting CSS transforms.
export var gecko3d = false;

// @property any3d: Boolean
// `true` for all browsers supporting CSS transforms.
export var any3d = true;

// @property mobile: Boolean; `true` for all browsers running in a mobile device.
export var mobile = typeof orientation !== 'undefined' || userAgentContains('mobile');

// @property mobileWebkit: Boolean; `true` for all webkit-based browsers in a mobile device.
export var mobileWebkit = mobile && webkit;

// @property mobileWebkit3d: Boolean
// `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
export var mobileWebkit3d = false;

// @property msPointer: Boolean
// `true` for browsers implementing the Microsoft touch events model (notably IE10).
export var msPointer = false && !window.PointerEvent && window.MSPointerEvent;

// @property pointer: Boolean
// `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
export var pointer = true;

// @property touch: Boolean
// `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
// This does not necessarily mean that the browser is running in a computer with
// a touchscreen, it only means that the browser is capable of understanding
// touch events.
export var touch = true;

// @property mobileOpera: Boolean; `true` for the Opera browser in a mobile device.
export var mobileOpera = false;

// @property mobileGecko: Boolean
// `true` for gecko-based browsers running in a mobile device.
export var mobileGecko = mobile && gecko;

// @property retina: Boolean
// `true` for browsers on a high-resolution "retina" screen or on any screen when browser's display zoom is more than 100%.
export var retina = (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1;

// @property passiveEvents: Boolean
// `true` for browsers that support passive events.
export var passiveEvents = true;

// @property canvas: Boolean
// `true` when the browser supports [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
export var canvas = true;

// @property svg: Boolean
// `true` when the browser supports [SVG](https://developer.mozilla.org/docs/Web/SVG).
export var svg = true;

// @property vml: Boolean
// `true` if the browser supports [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language).
export var vml = false;


function userAgentContains(str) {
	return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
}

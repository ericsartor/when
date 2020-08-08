// detect browser

// Opera 8.0+
// @ts-ignore
export const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
// @ts-ignore
export const isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
// @ts-ignore
export const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
// @ts-ignore
export const isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
// @ts-ignore
export const isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
// @ts-ignore
export const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Edge (based on chromium) detection
// @ts-ignore
export const isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
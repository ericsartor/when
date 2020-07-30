import { KeyStatusMap } from './types';
import { WhenError } from './utils/error';

// detect browser

// Opera 8.0+
// @ts-ignore
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
// @ts-ignore
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
// @ts-ignore
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
// @ts-ignore
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
// @ts-ignore
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
// @ts-ignore
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Edge (based on chromium) detection
// @ts-ignore
var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

// map of string identifier to key number
export const keys: { [key: string]: number } = {
  'ctrl': 17,
  'alt': 18,
  'shift': 16,
  'left_meta': 91, 'meta': 91,
  'right_meta': 92,
  
  'escape': 27,

  'f1': 112,
  'f2': 113,
  'f3': 114,
  'f4': 115,
  'f5': 116,
  'f6': 117,
  'f7': 118,
  'f8': 119,
  'f9': 120,
  'f10': 121,
  'f11': 122,
  'f12': 123,
  'f13': 124,
  'f14': 125,
  'f15': 126,
  'f16': 127,
  'f17': 128,
  'f18': 129,
  'f19': 130,

  'scroll_lock': 145,
  'pause_break': 19,
  'context_menu': 93,

  '`': 192, 'grave_accent': 192, 'tilde': 192,

  'num1': 49,
  'num2': 50,
  'num3': 51,
  'num4': 52,
  'num5': 53,
  'num6': 54,
  'num7': 55,
  'num8': 56,
  'num9': 57,
  'num0': 48,

  'hyphen': 189,
  '=': 187, 'equals': 187,

  'backspace': 8,
  'tab': 9,
  'caps_lock': 20,
  'space': 32,
  
  '[': 219, 'left_square_bracket': 219,
  ']': 221, 'right_square_bracket': 221,
  '\\': 220, 'backslash': 220, 'backward_slash': 220,
  ';': 186, 'semicolon': 186,
  '\'': 222, 'apostophe': 222,
  ',': 188, 'comma': 188,
  'period': 190,
  'forward_slash': 191,

  'enter': 13,

  'insert': 45,
  'home': 36,
  'page_up': 33,
  'delete': 46,
  'end': 35,
  'page_down': 34,

  'arrow_up': 38,
  'arrow_right': 39,
  'arrow_down': 40,
  'arrow_left': 37,

  'num_lock': 144,
  'numpad_divide': 111,
  'numpad_multiply': 106,
  'numpad_subtract': 109,
  'clear': 12,
  'numpad_add': 107,
  'numpad_decimal': 110,

  'numpad0': 96,
  'numpad1': 97,
  'numpad2': 98,
  'numpad3': 99,
  'numpad4': 100,
  'numpad5': 101,
  'numpad6': 102,
  'numpad7': 103,
  'numpad8': 104,
  'numpad9': 105,

  'a': 65,
  'b': 66,
  'c': 67,
  'd': 68,
  'e': 69,
  'f': 70,
  'g': 71,
  'h': 72,
  'i': 73,
  'j': 74,
  'k': 75,
  'l': 76,
  'm': 77,
  'n': 78,
  'o': 79,
  'p': 80,
  'q': 81,
  'r': 82,
  's': 83,
  't': 84,
  'u': 85,
  'v': 86,
  'w': 87,
  'x': 88,
  'y': 89,
  'z': 90,
}

// apply browser specific overrides for key values
if (isFirefox) {

  keys['hyphen'] = 173

  keys['='] = 61
  keys['equals'] = 61

  keys[';'] = 59
  keys['semicolon'] = 59

  keys['right_meta'] = 91

} else if (isEdge) {

  keys['clear'] = 101

} else if (isEdgeChromium) {

  // no overrides

} else if (isIE) {

  // no overrides

} else if (isOpera) {

  // no overrides

} else if (isChrome) {

  // no overrides

}

// map key numbers to an object that describes if the key is pressed, and when it was last pressed
export const keyStatus: KeyStatusMap = {}

// initialize key statuses
Object.keys(keys).forEach((key: string) => {
  keyStatus[keys[key]] = {
    pressed: false,
    timestamp: null,
  }
})

// external referance for modifier key numbers
export const modifierKeys = [ keys.alt, keys.ctrl, keys.left_meta, keys.right_meta, keys.shift ]

// receive a key number, get back the shortest string identifier for it
export const keyToString = (key: number): string | null => {
  const identifiers = []
  for (let keyName in keys) {
    if (keys[keyName] === key) identifiers.push(keyName)
  }

  const shortestIdentifier = identifiers.reduce((shortest, current) => {
    return Math.min(shortest.length, current.length) ? shortest : current
  }, identifiers[0])

  return shortestIdentifier || null
}

// find an error suggestion based on the string passed in
export const keySuggestions = (str: string) => {
  switch (str) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return `Numbers should be specified as either "num${str}" or "numpad${str}"`
    case '.':
      return `Instead of ".", you must use either "period" or "numpad_decimal", ` +
        `as these are interpreted as two different keys`
    case '-':
      return 'Instead of "-", you must either use "hyphen" or "numpad_subtract", ' +
        'as these are interpreted as two different keys'
    case '/':
      return 'Instead of "/", you must either use "forward_slash" or "numpad_divide", ' +
        'as these are interpreted as two different keys'
    case '*':
      return 'Instead of "*", you must use numpad_multiply, unless you meant to use "num8"'
    case '+':
      return 'Instead of "+", you must use numpad_add, unless you meant to use "="'
    case '~':
    case '!':
    case '@':
    case '#':
    case '$':
    case '%':
    case '^':
    case '&':
    case '(':
    case ')':
    case '_':
    case '{':
    case '}':
    case '|':
    case ':':
    case '"':
    case '<':
    case '>':
    case '?':
      return `The character "${str}" is not recognized, you probably meant to use the other ` +
        `character on that key`
    default: 
      return `Unrecognized key identifier "${str}"`
  }
}

// throw an error if the identifier provided doesn't match a key
export const validateKeyName = (name: string) => {
  if (keys[name] !== undefined) return

  // unknown key identifier, try to find suggestion for error
  const suggestion = keySuggestions(name)
  if (suggestion) {
    throw new WhenError(`${suggestion}`)
  }
}
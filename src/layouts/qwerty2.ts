import { isFirefox, isEdge, isEdgeChromium, isIE, isOpera, isChrome } from '../browser-detection'

// + - 'Equal' & 'NumpadAdd'
// - - 'Minus' & 'NumpadSubtract'
// . - 'Comma' & 'NumpadDecimal'
// / - 'Slash' & 'NumpadDivide'

// map of string identifier to key number
export const keys: { [key: string]: string } = {
  'ctrl': 'ControlLeft', 'ctrl_left': 'ControlLeft',
  'ctrl_right': 'ControlRight',
  'alt': 'AltLeft', 'alt_left': 'AltLeft',
  'alt_right': 'AltRight',
  'shift': 'ShiftLeft', 'shift_left': 'ShiftLeft',
  'shift_right': 'ShiftRight',
  'left_meta': 'MetaLeft', 'meta': 'MetaLeft',
  'right_meta': 'MetaRight',
  
  'escape': 'Escape',

  'f1': 'F1',
  'f2': 'F2',
  'f3': 'F3',
  'f4': 'F4',
  'f5': 'F5',
  'f6': 'F6',
  'f7': 'F7',
  'f8': 'F8',
  'f9': 'F9',
  'f10': 'F10',
  'f11': 'F11',
  'f12': 'F12',
  'f13': 'F13',
  'f14': 'F14',
  'f15': 'F15',
  'f16': 'F16',
  'f17': 'F17',
  'f18': 'F18',
  'f19': 'F19',

  'scroll_lock': 'ScrollLock',
  'pause_break': 'Pause',
  'context_menu': 'ContextMenu',

  '`': 'Backquote', '~': 'Backquote', 'grave_accent': 'Backquote', 'tilde': 'Backquote',

  'num1': 'Digit1',
  'num2': 'Digit2',
  'num3': 'Digit3',
  'num4': 'Digit4',
  'num5': 'Digit5',
  'num6': 'Digit6',
  'num7': 'Digit7',
  'num8': 'Digit8',
  'num9': 'Digit9',
  'num0': 'Digit0',

  '_': 'Minus', 'hyphen': 'Minus', 'underscore': 'Minus',
  '=': 'Equal', 'plus': 'Equal', 'equals': 'Equal',

  'backspace': 'Backspace',
  'tab': 'Tab',
  'caps_lock': 'CapsLock',
  'space': 'Space',
  
  '[': 'BracketLeft', '{': 'BracketLeft', 'left_bracket': 'BracketLeft', 'left_brace': 'BracketLeft',
  ']': 'BracketRight', '}': 'BracketRight', 'right_bracket': 'BracketRight', 'right_brace': 'BracketRight',
  '\\': 'Backslash', '|': 'Backslash', 'backslash': 'Backslash', 'pipe': 'Backslash',
  ';': 'Semicolon', ':': 'Semicolon', 'colon': 'Semicolon', 'semicolon': 'Semicolon',
  '\'': 'Quote', '"': 'Quote', 'apostrophe': 'Quote', 'quote': 'Quote',
  ',': 'Comma', '<': 'Comma', 'comma': 'Comma', 'left_chevron': 'Comma',
  '>': 'Period', 'period': 'Period', 'right_chevron': 'Period',
  '?': 'Slash', 'forward_slash': 'Slash', 'slash': 'Slash', 'question_mark': 'Slash',

  'enter': 'Enter', 'return': 'Enter',
  'numpad_enter': 'NumpadEnter', 'numpad_return': 'NumpadEnter',

  'insert': 'Insert',
  'home': 'Home',
  'page_up': 'PageUp',
  'delete': 'Delete',
  'end': 'End',
  'page_down': 'PageDown',

  'arrow_up': 'ArrowUp', 'up': 'ArrowUp',
  'arrow_right': 'ArrowRight', 'right': 'ArrowRight',
  'arrow_down': 'ArrowDown', 'down': 'ArrowDown',
  'arrow_left': 'ArrowLeft', 'left': 'ArrowLeft',

  'num_lock': 'NumPad',
  'numpad_divide': 'NumpadDivide',
  'numpad_multiply': 'NumpadMultiply',
  'numpad_subtract': 'NumpadSubtract',
  'numpad_add': 'NumpadAdd',
  'numpad_decimal': 'NumpadDecimal',

  'numpad0': 'Numpad0',
  'numpad1': 'Numpad1',
  'numpad2': 'Numpad2',
  'numpad3': 'Numpad3',
  'numpad4': 'Numpad4',
  'numpad5': 'Numpad5',
  'numpad6': 'Numpad6',
  'numpad7': 'Numpad7',
  'numpad8': 'Numpad8',
  'numpad9': 'Numpad9',

  'a': 'KeyA',
  'b': 'KeyB',
  'c': 'KeyC',
  'd': 'KeyD',
  'e': 'KeyE',
  'f': 'KeyF',
  'g': 'KeyG',
  'h': 'KeyH',
  'i': 'KeyI',
  'j': 'KeyJ',
  'k': 'KeyK',
  'l': 'KeyL',
  'm': 'KeyM',
  'n': 'KeyN',
  'o': 'KeyO',
  'p': 'KeyP',
  'q': 'KeyQ',
  'r': 'KeyR',
  's': 'KeyS',
  't': 'KeyT',
  'u': 'KeyU',
  'v': 'KeyV',
  'w': 'KeyW',
  'x': 'KeyX',
  'y': 'KeyY',
  'z': 'KeyZ',
}

// // apply browser specific overrides for key values
// if (isFirefox) {

//   keys['hyphen'] = 173
//   keys['_'] = 173
//   keys['underscore'] = 173


//   keys['='] = 61
//   keys['+'] = 61
//   keys['equals'] = 61
//   keys['plus'] = 61

//   keys[';'] = 59
//   keys[':'] = 59
//   keys['semicolon'] = 59
//   keys['colon'] = 59

//   keys['right_meta'] = 91

// } else if (isEdge) {

//   keys['clear'] = 101

// } else if (isEdgeChromium) {

//   // no overrides

// } else if (isIE) {

//   // no overrides

// } else if (isOpera) {

//   // no overrides

// } else if (isChrome) {

//   // no overrides

// }


// // find an error suggestion based on the string passed in
// export const keySuggestions = (str: string) => {
//   switch (str) {
//     // case '0':
//     // case '1':
//     // case '2':
//     // case '3':
//     // case '4':
//     // case '5':
//     // case '6':
//     // case '7':
//     // case '8':
//     // case '9':
//     //   return `Numbers should be specified as either "num${str}" or "numpad${str}"`
//     case '.':
//       return `Instead of ".", you must use either "period" or "numpad_decimal", ` +
//         `as these are interpreted as two different keys`
//     case '-':
//       return 'Instead of "-", you must either use "hyphen" or "numpad_subtract", ' +
//         'as these are interpreted as two different keys'
//     case '/':
//       return 'Instead of "/", you must either use "forward_slash" or "numpad_divide", ' +
//         'as these are interpreted as two different keys'
//     case '*':
//       return 'Instead of "*", you must use numpad_multiply, unless you meant to use "num8"'
//     case '+':
//       return 'Instead of "+", you must use numpad_add, unless you meant to use "="'
//     case '!':
//     case '@':
//     case '#':
//     case '$':
//     case '%':
//     case '^':
//     case '&':
//     case '(':
//     case ')':
//       return `The character "${str}" is not recognized, you probably meant to use the other ` +
//         `character on that key`
//     default: 
//       return `Unrecognized key identifier "${str}"`
//   }
// }

// export const modifierKeys =  [ keys.alt, keys.ctrl, keys.left_meta, keys.right_meta, keys.shift ]

// export const keyGroups = {
//   arrowKeys: [
//     'arrow_up',
//     'arrow_right',
//     'arrow_down',
//     'arrow_left',
//   ],

//   fKeys: [
//     'f1',
//     'f2',
//     'f3',
//     'f4',
//     'f5',
//     'f6',
//     'f7',
//     'f8',
//     'f9',
//     'f10',
//     'f11',
//     'f12',
//     'f13',
//     'f14',
//     'f15',
//     'f16',
//     'f17',
//     'f18',
//     'f19',
//   ],

//   letters: [
//     'a',
//     'b',
//     'c',
//     'd',
//     'e',
//     'f',
//     'g',
//     'h',
//     'i',
//     'j',
//     'k',
//     'l',
//     'm',
//     'n',
//     'o',
//     'p',
//     'q',
//     'r',
//     's',
//     't',
//     'u',
//     'v',
//     'w',
//     'x',
//     'y',
//     'z',
//   ],

//   numbers: [
//     '1',
//     '2',
//     '3',
//     '4',
//     '5',
//     '6',
//     '7',
//     '8',
//     '9',
//     '0',
//   ],
// }
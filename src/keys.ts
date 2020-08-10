import { KeyStatusMap, Whenable } from './types';
import { WhenError } from './utils/error';

// layouts
import * as qwerty from './layouts/qwerty'
export const layouts = {
  qwerty
}

// this is what gets overwritten when a layout is loaded
export let keys: { [key: string]: number } | null = null
export let modifierKeys: number[] | null = null
export let keyGroups: { [name: string]: string[] } | null = null
export let keyStatus: KeyStatusMap = {}                      // map key numbers to an object that describes if the key is pressed, and when it was last pressed
let keySuggestions: ((key: string) => string) | null = null

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

// throw an error if the identifier provided doesn't match a key
export const validateKeyName = (name: string, whenable?: Whenable) => {
  if (keys === null || keySuggestions === null) {
    console.log('validateKeyName() was called before a layout was loaded')
    return
  }

  if (name >= '0' || name <= '9' || keys[name] !== undefined) return

  // unknown key identifier, try to find suggestion for error
  const suggestion = keySuggestions(name)
  if (suggestion) {
    throw new WhenError(`${suggestion}`, whenable)
  }
}

export const loadLayout = (layoutName: 'qwerty') => {
  const layout = layouts[layoutName]

  if (!layout) {
    throw new WhenError('Attempted to load non-existant layout: ' + layoutName)
  }

  keys = layout.keys
  keySuggestions = layout.keySuggestions
  modifierKeys = layout.modifierKeys
  keyGroups = layout.keyGroups

  // initialize key statuses
  keyStatus = {}
  Object.keys(keys).forEach((key: string) => {
    keyStatus[keys![key]] = {
      pressed: false,
      timestamp: null,
    }
  })

}
import { WhenEvent } from '../types'

// parse an identifier like "shift+c" and detect any modifiers present
export const getModifiersFromIdentifier = (identifier: string): WhenEvent['modifiers'] => {
  const keys = identifier.split('+')
  return {
    shift: keys.includes('shift'),
    alt: keys.includes('alt'),
    ctrl: keys.includes('ctrl'),
    meta: keys.includes('meta'),
  }
}
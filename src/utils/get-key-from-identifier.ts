import { WhenError } from './error'
import { Whenable } from '../types'

export const getKeyFromIdentifier = (identifier: string, whenable: Whenable): string => {
  const nonModifierKeys = identifier.split('+').filter((str) => {
    return !['shift', 'alt', 'ctrl', 'meta', 'left_meta', 'right_meta'].includes(str)
  })

  if (nonModifierKeys.length > 1) {
    throw new WhenError('When: identifier for key contained more than one non-modifier key', whenable)
  } else {
    return nonModifierKeys[0]
  }
}
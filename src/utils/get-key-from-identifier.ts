export const getKeyFromIdentifier = (identifier: string): string => {
  const nonModifierKeys = identifier.split('+').filter((str) => {
    return !['shift', 'alt', 'ctrl', 'meta'].includes(str)
  })

  if (nonModifierKeys.length > 1) {
    throw Error('When: identifier for key contained more than one non-modifier key')
  } else {
    return nonModifierKeys[0]
  }
}
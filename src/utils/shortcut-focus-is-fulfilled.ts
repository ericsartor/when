import { focusedElement } from '../track-focus'
import { Shortcut } from '../classes/Shortcut'

export const shortcutFocusIsFulfilled = (shortcut: Shortcut) => {
  const { focusTarget } = shortcut

  if (focusTarget === null) {
    return true
  }

  if (focusedElement === null) {
    return false
  }

  // check to see if ID or class name are present on the current focused element
  if (typeof focusTarget === 'string') {
    if (focusTarget.includes('id:')) {
      const id = focusTarget.replace('id:', '')
      return focusedElement && focusedElement.id === id
    } else if (focusTarget.includes('class:')) {
      const className = focusTarget.replace('class:', '')
      return focusedElement && focusedElement.classList && focusedElement.classList.contains(className)
    }
  }
}
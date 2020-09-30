import { focusedElement } from '../track-focus'
import { Shortcut } from '../classes/Shortcut'

export const shortcutFocusIsFulfilled = (shortcut: Shortcut) => {
  const { focusTarget } = shortcut

  // if no focus target
  if (focusTarget === null) {
    return true
  }

  // if there is a focus target but no element is focused
  if (focusedElement === null) {
    return false
  }

  // check to see if ID or class name are present on the current focused element
  if (typeof focusTarget === 'string') {
    if (focusTarget.includes('id:') || focusTarget.includes('#')) {
      const id = focusTarget.replace('id:', '').replace('#', '')
      return focusedElement && focusedElement.id === id
    } else if (focusTarget.includes('class:') || focusTarget.includes('.')) {
      const className = focusTarget.replace('class:', '').replace('.', '') 
      return focusedElement && focusedElement.classList && focusedElement.classList.contains(className)
    }
  } else {
		return focusTarget === focusedElement;
	}
}
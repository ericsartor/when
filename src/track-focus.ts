import { FocusHandler } from './types'
import { WhenError } from './utils/error'

export const focusHandlers: FocusHandler[] = []
export let focusedElement: HTMLElement | null = null

export const setFocus = (el: HTMLElement) => {
  if (!el || (el instanceof HTMLElement) === false) {
    throw new WhenError(
      'When.setFocus() was not provided an HTMLElement as its first argument, received: ' + typeof el,
    )
  }
  if (el.classList.contains('when-focus') === false) {
    throw new WhenError(
      'When.setFocus() was provided an HTMLElement that did not have the "when-focus" class.',
    )
  }

  const previousFocusedElement = focusedElement
  focusedElement = el

  if (focusedElement !== previousFocusedElement) {
    focusHandlers.forEach((func) => func(focusedElement, previousFocusedElement))
  }
}

window.addEventListener('mousedown', (e: MouseEvent) => {
  if (e.target === null) return

  const previousFocusedElement = focusedElement
  const target = e.target as HTMLElement

  if (target.classList && target.classList.contains('when-focus')) {

    // if clicking directly on a focusable element, set it and return
    focusedElement = target

  } else {

    // look up the parent chain for the first focusable element
    focusedElement = target.parentNode as (HTMLElement | null)
    while (
      focusedElement && 
      focusedElement.classList && 
      !focusedElement.classList.contains('when-focus')
    ) {
      focusedElement = focusedElement.parentNode as (HTMLElement | null)
    }

    // if we never found a focusable element, set focus to null
    if (!focusedElement || !focusedElement.classList) {
      focusedElement = null
    }

  }

  if (focusedElement !== previousFocusedElement) {
    focusHandlers.forEach((func) => func(focusedElement, previousFocusedElement))
  }
})

export const validateFocusTarget = (focusTarget: string) => {
  const oldIdTarget = focusTarget.indexOf('id:') === 0;
  const oldClassTarget = focusTarget.indexOf('class:') === 0;
  const newIdTarget = focusTarget.indexOf('#') === 0;
  const newClassTarget = focusTarget.indexOf('.') === 0;

  return oldIdTarget || oldClassTarget || newIdTarget || newClassTarget;
}
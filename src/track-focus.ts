import { FocusHandler } from './types'

export const focusHandlers: FocusHandler[] = []
export let focusedElement: HTMLElement | null = null

window.addEventListener('click', (e: MouseEvent) => {
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
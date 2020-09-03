import { WhenEvent } from './types'
import { generateEventKeyString } from './utils/generate-event-key-string'

// map of unique key combination string to number of shortcuts using it to prevent default
// altctrlmetashiftenter -> 2
// ctrlc -> 1
export const preventDefaultShortcuts: Map<string, number> = new Map()

// check if this event should prevent default browser behaviour
export const checkPreventDefault = (event: WhenEvent, browserEvent: KeyboardEvent) => {

  // skip shortcuts that shouldn't trigger in inputs (if an input is focused)
  const activeTagName: string = document.activeElement ? document.activeElement.tagName.toLowerCase() : ''
  if (['textarea', 'input', 'select', 'button'].includes(activeTagName)) {
    return
  }

  const eventKeyString = generateEventKeyString(event)
  if (preventDefaultShortcuts.has(eventKeyString)) {
    const count = preventDefaultShortcuts.get(eventKeyString)!

    if (count > 0) {
      browserEvent.preventDefault()
    }
  }
}
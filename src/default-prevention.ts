import { WhenEvent } from './types'
import { generateEventKeyString } from './utils/generate-event-key-string'

// map of unique key combination string to number of shortcuts using it to prevent default
// altctrlmetashiftenter -> 2
// ctrlc -> 1
export const preventDefaultShortcuts: Map<string, number> = new Map()

// check if this event should prevent default browser behaviour
export const checkPreventDefault = (event: WhenEvent, browserEvent: KeyboardEvent) => {
  const eventKeyString = generateEventKeyString(event)
  if (preventDefaultShortcuts.has(eventKeyString)) {
    const count = preventDefaultShortcuts.get(eventKeyString)!

    if (count > 0) {
      browserEvent.preventDefault()
    }
  }
}
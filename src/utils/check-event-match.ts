import { WhenEvent } from '../types'
import { WhenError } from './error'

// compare an event from a shortcut timeline to an actual event from the event history
export const checkEventMatch = (shortcutEvent: WhenEvent, historyEvent: WhenEvent): boolean => {
  // confirm the key and type are the same
  if (shortcutEvent.key !== historyEvent.key || shortcutEvent.type !== historyEvent.type) {
    return false
  }

  // confirm modifier keys are the same
  if (
    shortcutEvent.modifiers.shift !== historyEvent.modifiers.shift ||
    shortcutEvent.modifiers.meta !== historyEvent.modifiers.meta ||
    shortcutEvent.modifiers.alt !== historyEvent.modifiers.alt ||
    shortcutEvent.modifiers.ctrl !== historyEvent.modifiers.ctrl
  ) {
    return false
  }

  if (shortcutEvent.type === 'held') {
    // ensure that the history event's held duration is greather than
    // or equal to the duration required by the shortcut timeline event
    if (historyEvent.duration === undefined || shortcutEvent.duration === undefined) {
      throw new WhenError('"held" event had undefined "duration" property')
    } else {
      if (historyEvent.duration < shortcutEvent.duration) {
        return false
      } else {
        return true
      }
    }
  } else {
    // pressed and released events are a match at this point
    return true
  }
}
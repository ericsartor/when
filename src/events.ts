import { WhenEvent } from './types'
import { WhenError } from './utils/error'
import { Shortcut } from './classes/Shortcut'
import { commands, heldInterval, shouldCheckEvents } from './when'
import { checkPreventDefault } from './default-prevention'
import { modifierKeys, keys, keyStatus } from './keys'
import { focusedElement } from './track-focus'

// helpers
import { checkEventMatch } from './utils/check-event-match'
import { shortcutFocusIsFulfilled } from './utils/shortcut-focus-is-fulfilled'
import { currentMode } from './modes'

// starting value for event IDs
let eventId = 0

// an array of emitted WhenEvents in chronological order
export const eventHistory: WhenEvent[] = []

// handles logging the event and adding an ID
export const addNewEvent = (event: WhenEvent) => {
  const id = eventId++
  eventHistory.push({
    ...event,
    id,
  })
}

// track the last native browser event for keydown/keyup events
let lastKeydownEvent: KeyboardEvent | null = null
let lastKeyupEvent: KeyboardEvent | null = null

// ANCHOR: emitEvent
// handles recording the event, then checking to see if the event has triggered a shortcut
export const emitEvent = (event?: WhenEvent) => {
  // add event to history if one is provided, there won't be one for "held" event updates
  if (event !== undefined) addNewEvent(event)

  // check each shortcut to see if its timeline has been fulfilled
  // the last event in the shortcut timeline must be the most recent event in the history
  // also, the timeline events don't have to be consecutive, but they must be in order
  Shortcut.map.forEach((shortcut: Shortcut) => {
    // skip paused shortcuts
    if (!shortcut.active) return

    // skip shortcuts whose mode requirement is not fulfilled
    if (shortcut.mode && currentMode !== shortcut.mode) return

    // skip shortcuts that require an element to be focused (which is not currently focused)
    if (!shortcutFocusIsFulfilled(shortcut)) return

    // skip shortcuts that shouldn't trigger in inputs (if an input is focused)
    const activeTagName: string = document.activeElement ? document.activeElement.tagName.toLowerCase() : ''
    if (!shortcut.inInput && ['textarea', 'input', 'select', 'button'].includes(activeTagName)) {
      return
    }

    // determine if shortcut's event timeline has been fulfilled
    let failed = false
    const shortcutEvents = [...shortcut.timeline]
    const foundEvents: WhenEvent[] = []
    for (let i = 0; i < eventHistory.length; i++) {
      // if we've found all the events, break
      if (foundEvents.length === shortcut.timeline.length) break

      const shortcutEvent = shortcutEvents[shortcutEvents.length - 1]
      const historyEvent = eventHistory[eventHistory.length - 1 - i]
      
      // make sure we aren't re-triggering on the "held" event more than once
      if (shortcut.lastTriggeredEventId === historyEvent.id!) {
        failed = true
        break
      }

      if (i === 0) {
        // first history event must be the last shortcut event
        if (checkEventMatch(shortcutEvent, historyEvent)) {
          foundEvents.unshift(historyEvent)
          shortcutEvents.pop()
        } else {
          failed = true
          break
        }
      } else {
        // check to see if we've gone too far into the past
        const requiredEndEvent = foundEvents[foundEvents.length - 1]
        const timeSinceLatestEvent = requiredEndEvent.timestamp - historyEvent.timestamp
        if (
          shortcut.timeConstraint !== null &&
          shortcut.timeConstraint > 0 && 
          timeSinceLatestEvent > shortcut.timeConstraint
        ) {
          // we've gone too far into the past based on time constraint, not fulfilled
          failed = true
          break
        }

        // check to see if we've found the next required event
        const sameType = historyEvent.type === shortcutEvent.type
        if (
          sameType &&
          checkEventMatch(shortcutEvent, historyEvent)
        ) {
          // same type and match, add event to found list and look for next event
          foundEvents.unshift(historyEvent)
          shortcutEvents.pop()
          continue
        } else if (sameType) {
          // if events are same type but not a match, the shortcut is not fulfilled
          failed = true
          break
        } else {
          // skip events that aren't the type we're looking for
          continue
        }
      }
    }

    // ensure we never raised the fail flag and that we found all events
    if (failed || foundEvents.length !== shortcut.timeline.length) return

    // ensure events are within the time constraint (if there is one)
    if (shortcut.timeConstraint !== null && shortcut.timeConstraint > 0) {
      const firstEvent = foundEvents[0]
      const lastEvent = foundEvents[foundEvents.length - 1]

      if (lastEvent !== undefined && firstEvent !== undefined &&
        lastEvent.timestamp - firstEvent.timestamp > shortcut.timeConstraint) {
        failed = true
      }
      
      if (failed) return
    }

    // run command handler
    const lastEvent = foundEvents[foundEvents.length - 1]
    const eventType = lastEvent.type
    const browserEvent = eventType === 'released' ? lastKeyupEvent! : lastKeydownEvent!
    const ctx = {
      event: browserEvent,
      alt: browserEvent.altKey,
      ctrl: browserEvent.ctrlKey,
      shift: browserEvent.shiftKey,
      meta: browserEvent.metaKey,
      shortcut,
      keys: shortcut.keys,
      focusedElement: focusedElement,
      pressDuration: eventType === 'held' ? lastEvent.duration : undefined
    }

    // check handler first because "command" may be filled in simply for documentation purposes
    if (shortcut.handler) {
      shortcut.handler(ctx)
    } else if (shortcut.command) {
      if (typeof commands[shortcut.command] !== 'function') {
        throw new WhenError(`command "${shortcut.command}" hasn't been been registered as a ` +
          `function with When([command_name]).Run([function])`)
      }
      commands[shortcut.command](ctx)
    }

    // remove shortcut if "once" was specified on it
    if (shortcut.once) {
      shortcut.remove()
    }

    // update event ID so we won't re-trigger a "held" command on the same event
    shortcut.lastTriggeredEventId = foundEvents[foundEvents.length - 1].id!
  })
}

// ANCHOR: keydown listener
// trigger a "pressed" event and update key status
window.addEventListener('keydown', (e: KeyboardEvent) => {
  if (!shouldCheckEvents) return

  if (keys === null || modifierKeys === null) {
    return
  }

  const event: WhenEvent = {
    type: 'pressed',
    key: e.which,
    identifier: '',
    timestamp: performance.now(),
    modifiers: {
      shift: e.shiftKey,
      alt: e.altKey,
      ctrl: e.ctrlKey,
      meta: e.metaKey,
    }
  }

  // handle preventing default behaviour
  checkPreventDefault(event, e)

  if (keyStatus[e.which].pressed !== true) {

    // modifier key presses don't get emitted, but are still tracked in the key map
    if (!modifierKeys.includes(e.which)) {
      lastKeydownEvent = e
      emitEvent(event)
    }

    // updating tracking info for the pressed key
    keyStatus[e.which].pressed = true
    keyStatus[e.which].timestamp = performance.now()
  }
})

// ANCHOR: keyup listener
// trigger a "released" event and initialize key status
window.addEventListener('keyup', (e: KeyboardEvent) => {
  if (!shouldCheckEvents) return

  if (keys === null || modifierKeys === null) {
    return
  }

  if (keyStatus[e.which].pressed !== false) {
    if (!modifierKeys.includes(e.which)) {
      const event: WhenEvent = {
        type: 'released',
        key: e.which,
        identifier: '',
        timestamp: performance.now(),
        modifiers: {
          shift: e.shiftKey,
          alt: e.altKey,
          ctrl: e.ctrlKey,
          meta: e.metaKey,
        },
      }
      lastKeyupEvent = e
      emitEvent(event)
      keyStatus[e.which].pressed = false
      keyStatus[e.which].timestamp = null
    } else {
      // modifier key releases don't get emitted, but they are tracked
      keyStatus[e.which].pressed = false
      keyStatus[e.which].timestamp = null
    }
  }
});

// ANCHOR: "held" event interval
// check for held keys on an interval and trigger "held" events for each pressed key
(function checkForHeldEvents() {
  
  if (keys === null) {
    throw new WhenError('A layout has not been loaded yet.')
  }

  if (shouldCheckEvents) {
    Object.keys(keyStatus).forEach((which: string | number) => {
      which = Number(which)
      if (!keyStatus[which].pressed) return
      if (keyStatus[which].timestamp === null) return
  
      const delta = performance.now() - keyStatus[which].timestamp!
  
      // "held" events can only be triggered after 500 ms of holding
      if (delta < 500) {
        return
      }

      if (keys === null) {
        throw new WhenError('A layout has not been loaded yet.')
      }
  
      const modifiers = {
        shift: keyStatus[keys.shift].pressed,
        alt: keyStatus[keys.alt].pressed,
        ctrl: keyStatus[keys.ctrl].pressed,
        meta: keyStatus[keys.left_meta].pressed || keyStatus[keys.right_meta].pressed,
      }
  
      // check to see if a "held" event has already been emitted since the last time the
      // given key was pressed
      let preexistingIndex = null
      for (let i = eventHistory.length - 1; i >= 0; i--) {
        const event = eventHistory[i]
  
        // break if we are farther back in time than the last time the given key was pressed
        if (event.timestamp < keyStatus[which].timestamp!) {
          break
        }
  
        // skip events that don't pertain to the given key
        if (event.key !== which) continue
  
        // skip non-held events
        if (event.type !== 'held') continue
  
        // ensure all modifiers are the same for this event
        const modifiersMatch = event.modifiers.shift === modifiers.shift &&
          event.modifiers.ctrl === modifiers.ctrl &&
          event.modifiers.alt === modifiers.alt &&
          event.modifiers.meta === modifiers.meta
  
        // found a suitable held event to update
        if (modifiersMatch) {
          preexistingIndex = i
          break
        }
      }
  
      // either emit a new event or update ane existing one
      if (preexistingIndex !== null) {
        eventHistory[preexistingIndex].duration = delta
        emitEvent() // empty emit to update "held" event
      } else {
        emitEvent({
          type: 'held',
          key: Number(which),
          identifier: '',
          duration: delta,
          timestamp: performance.now(),
          modifiers,
        })
      }
    })
  }
  setTimeout(checkForHeldEvents, heldInterval)
})();
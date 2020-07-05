import { CommandMap, WhenEvent, Whenable, WhenEventHandler } from './types'
import { keys, validateKeyIdentifier, keyToString } from './keys'
import { addNewShortcut, shortcuts } from './shortcuts'

// helpers
import { getKeyFromIdentifier } from './utils/get-key-from-identifier'
import { getModifiersFromIdentifier } from './utils/get-modifiers-from-identifier'

// map command names to their event handlers
export const commands: CommandMap = {}

// helper that is used in Seconds() and Milliseconds() to either create a "held" event
// or create a time constraint on a Shortcut
function handleTime(this: Whenable, multiplier: number) {
  if (this.n === null) {
    throw Error('When: n value was null')
  }

  switch (this.nType) {
    case 'held':
      this.events.push({
        type: 'pressed',
        key: keys[getKeyFromIdentifier(this.identifier)],
        timestamp: 0, // this isn't necessary for timeline events
        modifiers: getModifiersFromIdentifier(this.identifier),
      })
      this.events.push({
        type: 'held',
        key: keys[getKeyFromIdentifier(this.identifier)],
        timestamp: 0, // this isn't necessary for timeline events
        duration: multiplier * this.n,
        modifiers: getModifiersFromIdentifier(this.identifier),
      })
      break
    case 'constraint':
      this.timeConstraint = multiplier * this.n
  }
}

export function When(identifier: string): Whenable {
  return {
    identifier: identifier.toLowerCase(), // set the identifier that was passed in
    events: [],
    timeConstraint: null,
    preventDefault: false,
    n: null,
    nType: null,
    once: false,
    controller: null,
    shortcut: null,


    // changes current identifier
    Then(identifier: string) {
      this.identifier = identifier.toLowerCase()
      return this
    },

    // add an event for the current identified key to the timeline of events
    IsPressed() {
      validateKeyIdentifier(getKeyFromIdentifier(this.identifier))
      const events: WhenEvent[] = this.events
      events.push({
        type: 'pressed',
        key: keys[getKeyFromIdentifier(this.identifier)],
        timestamp: 0, // this isn't necessary for timeline events
        modifiers: getModifiersFromIdentifier(this.identifier),
      })
      return this
    },

    IsReleased() {
      validateKeyIdentifier(getKeyFromIdentifier(this.identifier))
      const events: WhenEvent[] = this.events
      events.push({
        type: 'released',
        key: keys[getKeyFromIdentifier(this.identifier)],
        timestamp: 0, // this isn't necessary for timeline events
        modifiers: getModifiersFromIdentifier(this.identifier),
      })
      return this
    },

    IsHeldFor(n: number) {
      validateKeyIdentifier(getKeyFromIdentifier(this.identifier))
      this.n = n
      this.nType = 'held'
      return this
    },

    Within(n: number) {
      this.n = n
      this.nType = 'constraint'
      return this
    },

    Milliseconds() {
      handleTime.call(this, 1)
      return this
    },

    Seconds() {
      handleTime.call(this, 1000)
      return this
    },

    PreventDefault() {
      this.preventDefault = true
      return this
    },

    Execute(command: string) {
      this.shortcut = {
        timeline: this.events,
        command: command.toLowerCase(),
        timeConstraint: this.timeConstraint,
        lastTriggeredEventId: null,
        preventDefault: this.preventDefault,
        active: true,
        once: false,
        controller: null,
      }

      this.controller = addNewShortcut(this.shortcut)

      return this.controller
    },

    Run(func: WhenEventHandler) {
      commands[this.identifier.toLowerCase()] = func
    },
  }
}

When.Documentation = () => {
  const lines: { combination: string, command: string }[] = []
  shortcuts.forEach((shortcut) => {
    const shortcutCombination = shortcut.timeline.map((event) => {
      const { alt, ctrl, meta, shift } = event.modifiers
      let modifierString = `${alt?'alt+':''}${ctrl?'ctrl+':''}${meta?'meta+':''}${shift?'shift+':''}`
      switch (event.type) {
        case 'pressed':
          return `, ↓${modifierString}${keyToString(event.key)}`
        case 'released':
          return `, ↑${modifierString}${keyToString(event.key)}`
        case 'held':
          return ` (hold ${event.duration! / 1000}s)`
      }
    })

    lines.push({
      combination: shortcutCombination.join('').slice(2),
      command: shortcut.command,
    })
  })

  return lines
}

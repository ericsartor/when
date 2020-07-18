import { CommandMap, WhenEvent, Whenable, WhenEventHandler, FocusHandler } from './types'
import { keys, validateKeyIdentifier, keyToString } from './keys'
import { Shortcut } from './classes/Shortcut'
import { focusHandlers, focusedElement } from './track-focus'

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

  if (this.identifier === null) {
    throw Error('When: identifier value was null')
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

export function When(identifierOrElement: string | HTMLElement): Whenable {
  return {
    identifier: typeof identifierOrElement !== 'string' ? null :  identifierOrElement.toLowerCase(), // set the identifier that was passed in
    element: typeof identifierOrElement === 'string' ? null :  identifierOrElement, // set the identifier that was passed in
    events: [],
    timeConstraint: null,
    focusRequired: false,
    isCommand: false,
    preventDefault: false,
    n: null,
    nType: null,
    once: false,
    shortcut: null,


    // changes current identifier
    Then(identifier: string) {
      this.identifier = identifier.toLowerCase()
      return this
    },

    IsFocused() {
      this.focusRequired = true
      return this
    },

    IsExecuted() {
      this.isCommand = true
      return this
    },

    // add an event for the current identified key to the timeline of events
    IsPressed() {
      if (this.identifier === null) {
        throw 'When: IsPressed() cannot be called before a string key identifier has been passed to When()'
      }

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
      if (this.identifier === null) {
        throw 'When: IsReleased() cannot be called before a string key identifier has been passed to When()'
      }

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
      if (this.identifier === null) {
        throw 'When: IsHeldFor() cannot be called before a string key identifier has been passed to When()'
      }
      
      validateKeyIdentifier(getKeyFromIdentifier(this.identifier))
      this.n = n
      this.nType = 'held'
      return this
    },

    Within(n: number) {
      if (isNaN(n) || n === 0) {
        throw 'When: Within() expects to receive a number greater than 0'
      }

      this.n = Number(n)
      this.nType = 'constraint'
      return this
    },

    Milliseconds() {
      if (!this.n) {
        throw 'When: Milliseconds() cannot be called before a number greater than 0 has been passed to IsHeldFor() or Within()'
      }
      
      handleTime.call(this, 1)
      return this
    },

    Seconds() {
      if (!this.n) {
        throw 'When: Seconds() cannot be called before a number greater than 0 has been passed to IsHeldFor() or Within()'
      }

      handleTime.call(this, 1000)
      return this
    },

    PreventDefault() {
      this.preventDefault = true
      return this
    },

    Execute(command: string) {
      return new Shortcut({
        timeline: this.events,
        command: command.toLowerCase(),
        timeConstraint: this.timeConstraint,
        focusElement: this.focusRequired ? this.element : null,
        preventDefault: this.preventDefault,
      })
    },

    Run(func: WhenEventHandler) {
      if (this.identifier === null) {
        throw 'When: Run() cannot be called before a string key identifier has been passed to When()'
      }
      if (typeof func !== 'function') {
        throw 'When: Run() must be called with a function as its first and only argument'
      }
      if (!this.isCommand) {
        throw 'When: Run() must be called after a call to IsExecuted()'
      }

      commands[this.identifier.toLowerCase()] = func
    },

    FocusChanges(func: FocusHandler) {
      focusHandlers.push(func)
    }
  }
}

When.Documentation = () => {
  const lines: { combination: string, command: string }[] = []
  Shortcut.map.forEach((shortcut) => {
    let shortcutEvents = shortcut.timeline.map((event) => {
      const { alt, ctrl, meta, shift } = event.modifiers
      let modifierString = `${alt?'alt+':''}${ctrl?'ctrl+':''}${meta?'meta+':''}${shift?'shift+':''}`
      switch (event.type) {
        case 'pressed':
          return `, &darr;${modifierString}${keyToString(event.key)}`
        case 'released':
          return `, &uarr;${modifierString}${keyToString(event.key)}`
        case 'held':
          return ` (hold ${event.duration! / 1000}s)`
      }
    })

    let shortcutCombination = shortcutEvents.join('').slice(2)

    if (shortcut.timeConstraint) {
      if (shortcut.timeConstraint < 1000) {
        const milliseconds = shortcut.timeConstraint
        shortcutCombination += ` (within ${milliseconds}ms)`
      } else {
        const seconds = (shortcut.timeConstraint / 1000).toFixed(2)
        shortcutCombination += ` (within ${seconds}s)`
      }
    }

    lines.push({
      combination: shortcutCombination,
      command: shortcut.command,
    })
  })

  return lines
}

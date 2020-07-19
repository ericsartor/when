import { CommandMap, WhenEvent, Whenable, WhenEventHandler, FocusHandler } from './types'
import { keys, validateKeyIdentifier, keyToString } from './keys'
import { Shortcut } from './classes/Shortcut'
import { focusHandlers, focusedElement } from './track-focus'
import { WhenError, warn, warnAboutChainOrder } from './utils/error'

// helpers
import { getKeyFromIdentifier } from './utils/get-key-from-identifier'
import { getModifiersFromIdentifier } from './utils/get-modifiers-from-identifier'

// map command names to their event handlers
export const commands: CommandMap = {}

// helper that is used in Seconds() and Milliseconds() to either create a "held" event
// or create a time constraint on a Shortcut
function handleTime(this: Whenable, multiplier: number) {
  if (this.n === null) {
    throw new WhenError('n value was null', this)
  }

  if (this.identifier === null) {
    throw new WhenError('identifier value was null', this)
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
  // validate identifierOrElement is of the correct type
  if (
    identifierOrElement !== undefined &&
    typeof identifierOrElement !== 'string' &&
    !(identifierOrElement instanceof HTMLElement)
  ) {
    throw new WhenError(
      'When() must be passed either a string identifier for a key (optionally with modifiers), ' +
      'a string name for a command or an HTMLElement for focus related functionality.  Instead, ' +
      'a value of type [' + typeof identifierOrElement + '] was receieved: ' + identifierOrElement
    )
  }

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
    lastCalledFunctionName: 'When()',


    // changes current identifier
    Then(identifier: string) {
      warnAboutChainOrder('Then()', this, [
        'IsFocused()', 'IsPressed()', 'IsReleased()', 'Seconds()', 'Milliseconds()',
      ])

      // validate identifier
      if (typeof identifier !== 'string') {
        throw new WhenError('Then() must be called with a string key identifier (optionally with modifiers).', this)
      }

      this.identifier = identifier.toLowerCase()
      this.lastCalledFunctionName = 'Then()'
      return this
    },

    IsFocused() {
      warnAboutChainOrder('IsFocused()', this, [
        'When()'
      ])

      // validation
      if (!this.element) {
        throw new WhenError('IsFocused() cannot be called until When() has received an HTMLElement', this)
      }
      if (!this.element.classList || !this.element.classList.contains('when-focus')) {
        throw new WhenError('IsFocused() was called, but the HTMLElement provided to When() ' +
          'did not have the "when-focus" class assigned to it.')
      }

      this.focusRequired = true
      this.lastCalledFunctionName = 'IsFocused()'
      return this
    },

    IsExecuted() {
      warnAboutChainOrder('IsExecuted()', this, [
        'When()',
      ])
      
      // validate
      if (this.identifier === null) {
        throw new WhenError('IsExecuted() cannot be called before a string command name has been passed to When().', this)
      }

      this.isCommand = true
      this.lastCalledFunctionName = 'IsExecuted()'
      return this
    },

    // add an event for the current identified key to the timeline of events
    IsPressed() {
      warnAboutChainOrder('IsPressed()', this, [
        'When()', 'Then()',
      ])

      // validate
      if (this.identifier === null) {
        throw new WhenError('IsPressed() cannot be called before a string key identifier has been passed to When() or Then()', this)
      }

      validateKeyIdentifier(getKeyFromIdentifier(this.identifier))
      const events: WhenEvent[] = this.events
      events.push({
        type: 'pressed',
        key: keys[getKeyFromIdentifier(this.identifier)],
        timestamp: 0, // this isn't necessary for timeline events
        modifiers: getModifiersFromIdentifier(this.identifier),
      })
      this.lastCalledFunctionName = 'IsPressed()'
      return this
    },

    IsReleased() {
      warnAboutChainOrder('IsReleased()', this, [
        'When()', 'Then()',
      ])

      // validate
      if (this.identifier === null) {
        throw new WhenError('IsReleased() cannot be called before a string key identifier has been passed to When() or Then()', this)
      }

      validateKeyIdentifier(getKeyFromIdentifier(this.identifier))
      const events: WhenEvent[] = this.events
      events.push({
        type: 'released',
        key: keys[getKeyFromIdentifier(this.identifier)],
        timestamp: 0, // this isn't necessary for timeline events
        modifiers: getModifiersFromIdentifier(this.identifier),
      })
      this.lastCalledFunctionName = 'IsReleased()'
      return this
    },

    IsHeldFor(n: number) {
      warnAboutChainOrder('IsHeldFor()', this, [
        'When()', 'Then()',
      ])

      // validate
      if (this.identifier === null) {
        throw new WhenError('IsHeldFor() cannot be called before a string key identifier has been passed to When() or Then()', this)
      }
      if (isNaN(n) || n === 0) {
        throw new WhenError(
          'IsHeldFor() expects to receive a number greater than 0, but received ' +
          'a value of type [' + typeof n + ']: ' + n,
          this
        )
      }
      
      validateKeyIdentifier(getKeyFromIdentifier(this.identifier))
      this.n = n
      this.nType = 'held'
      this.lastCalledFunctionName = 'IsHeldFor()'
      return this
    },

    Within(n: number) {
      warnAboutChainOrder('Within()', this, [
        'IsPressed()', 'IsReleased()', 'Seconds()', 'Milliseconds()',
      ])

      if (isNaN(n) || n === 0) {
        throw new WhenError(
          'Within() expects to receive a number greater than 0, but received ' +
          'a value of type [' + typeof n + ']: ' + n,
          this
        )
      }

      this.n = Number(n)
      this.nType = 'constraint'
      this.lastCalledFunctionName = 'Within()'
      return this
    },

    Milliseconds() {
      warnAboutChainOrder('Milliseconds()', this, [
        'IsHeldFor()', 'Within()'
      ])

      if (!this.n) {
        throw new WhenError('Milliseconds() cannot be called before a number greater than 0 has been passed to IsHeldFor() or Within()', this)
      }
      
      handleTime.call(this, 1)
      this.lastCalledFunctionName = 'Milliseconds()'
      return this
    },

    Seconds() {
      warnAboutChainOrder('Seconds()', this, [
        'IsHeldFor()', 'Within()'
      ])

      if (!this.n) {
        throw new WhenError('Seconds() cannot be called before a number greater than 0 has been passed to IsHeldFor() or Within()', this)
      }

      handleTime.call(this, 1000)
      this.lastCalledFunctionName = 'Seconds()'
      return this
    },

    PreventDefault() {
      warnAboutChainOrder('PreventDefault()', this, [
        'IsPressed()', 'IsReleased()', 'Seconds()', 'Milliseconds()'
      ])
      
      this.preventDefault = true
      this.lastCalledFunctionName = 'PreventDefault()'
      return this
    },

    Execute(command: string) {
      warnAboutChainOrder('Execute()', this, [
        'IsPressed()', 'IsReleased()', 'Seconds()', 'Milliseconds()', 'PreventDefault()'
      ])

      if (typeof command !== 'string') {
        throw new WhenError('Execute() must be called with a string command name as the only argument.', this)
      }

      command = command.toLowerCase()

      if (commands[command] === undefined) {
        throw new WhenError('Execute() was called with a command name not yet registered by a ' +
          'call to When([command_name]).IsExecuted().Run([function]): ' + command, this)
      }

      this.lastCalledFunctionName = 'Execute()'
      return new Shortcut({
        timeline: this.events,
        command,
        timeConstraint: this.timeConstraint,
        focusElement: this.focusRequired ? this.element : null,
        preventDefault: this.preventDefault,
      })
    },

    Run(func: WhenEventHandler) {
      warnAboutChainOrder('Run()', this, [
        'IsExecuted()'
      ])

      if (this.identifier === null) {
        throw new WhenError('Run() cannot be called before a string key identifier has been passed to When().', this)
      }
      if (typeof func !== 'function') {
        throw new WhenError('Run() must be called with a function as its first and only argument.', this)
      }
      if (!this.isCommand) {
        throw new WhenError('Run() must be called after a call to IsExecuted().', this)
      }

      commands[this.identifier.toLowerCase()] = func
      
      this.lastCalledFunctionName = 'Run()'
    },

    FocusChanges(func: FocusHandler) {
      warnAboutChainOrder('FocusChanges()', this, [
        'When()'
      ])

      focusHandlers.push(func)
      this.lastCalledFunctionName = 'FocusChanges()'
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

import { CommandMap, Whenable, WhenEventHandler, FocusHandler } from './types'
import { keys, validateKeyName } from './keys'
import { Shortcut } from './classes/Shortcut'
import { focusHandlers } from './track-focus'
import { WhenError, warn, warnAboutChainOrder } from './utils/error'
import { setMode, clearMode } from './modes'
import { newGroup } from './groups'

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

  const keyName = getKeyFromIdentifier(this.identifier)
  validateKeyName(keyName)
  const modifiers = getModifiersFromIdentifier(this.identifier)
  switch (this.nType) {
    case 'held':
      this.events.push({
        type: 'pressed',
        key: keys[keyName.toLowerCase()],
        timestamp: 0, // this isn't necessary for timeline events
        modifiers,
      })
      this.events.push({
        type: 'held',
        key: keys[keyName.toLowerCase()],
        timestamp: 0, // this isn't necessary for timeline events
        duration: multiplier * this.n,
        modifiers,
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
    identifier: typeof identifierOrElement !== 'string' ? null :  identifierOrElement, // set the identifier that was passed in
    element: typeof identifierOrElement === 'string' ? null :  identifierOrElement, // set the identifier that was passed in
    events: [],
    timeConstraint: null,
    focusRequired: false,
    focusTarget: null,
    mode: null,
    isCommand: false,
    preventDefault: false,
    n: null,
    nType: null,
    once: false,
    inInput: false,
    shortcut: null,
    lastCalledFunctionName: 'When()',


    // changes current identifier
    Then(identifier: string) {
      warnAboutChainOrder('Then()', this, [
        'ModeIs()', 'IsFocused()', 'IsPressed()', 'IsReleased()', 'Seconds()', 'Milliseconds()',
      ])

      // validate identifier
      if (typeof identifier !== 'string') {
        throw new WhenError('Then() must be called with a string key identifier (optionally with modifiers).', this)
      }

      this.identifier = identifier
      this.lastCalledFunctionName = 'Then()'
      return this
    },

    ModeIs(modeName: string) {
      warnAboutChainOrder('ModeIs()', this, [
        'When()'
      ])

      // validation
      if (modeName === undefined) {
        throw new WhenError(
          `ModeIs() was called without a string argument.  A mode name is required as the first ` +
            `and only argument.`,
          this
        )
      } else if (typeof modeName !== 'string') {
        throw new WhenError(
          `ModeIs() was called with a ${typeof modeName} argument instead of a string: ${modeName}`,
          this
        )
      }

      this.mode = modeName
      this.lastCalledFunctionName = 'ModeIs()'
      return this
    },

    IsFocused() {
      warnAboutChainOrder('IsFocused()', this, [
        'When()'
      ])

      // validation
      if (this.identifier) {
        let validIdentifier = this.identifier.includes('id:') || this.identifier.includes('class:')
        if (!validIdentifier) {
          throw new WhenError(
            'IsFocused() was called but the string identifier provided to When() was neither an ' +
              '"id:" or a "class:" selector',
            this
          )
        }
      } else if (this.element) {
        if (!this.element.classList || !this.element.classList.contains('when-focus')) {
          throw new WhenError(
            'IsFocused() was called, but the HTMLElement provided to When() ' +
              'did not have the "when-focus" class assigned to it.',
            this
          )
        }
      } else {
        throw new WhenError(
          'IsFocused() cannot be called until When() has received an ' +
            'HTMLElement or a "id:"/"class:" selector',
          this
        )
      }

      this.focusRequired = true
      
      // set the focus target
      if (this.identifier) {
        this.focusTarget = this.identifier
      } else if (this.element) {
        this.focusTarget = this.element
      }

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

      const keyName = getKeyFromIdentifier(this.identifier)
      validateKeyName(keyName)
      const modifiers = getModifiersFromIdentifier(this.identifier)
      this.events.push({
        type: 'pressed',
        key: keys[keyName.toLowerCase()],
        timestamp: 0, // this isn't necessary for timeline events
        modifiers,
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

      const keyName = getKeyFromIdentifier(this.identifier)
      validateKeyName(keyName)
      const modifiers = getModifiersFromIdentifier(this.identifier)
      this.events.push({
        type: 'released',
        key: keys[keyName.toLowerCase()],
        timestamp: 0, // this isn't necessary for timeline events
        modifiers,
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
      
      validateKeyName(getKeyFromIdentifier(this.identifier))
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

    Execute(commandNameOrFunc: string | WhenEventHandler, commandName?: string) {
      warnAboutChainOrder('Execute()', this, [
        'IsPressed()', 'IsReleased()', 'Seconds()', 'Milliseconds()', 'PreventDefault()'
      ])

      if (this.events.length === 0) {
        throw new WhenError(
          'Execute() was called before any key events were registered in the shortcut chain.  '+
            'You need to call either IsPressed(), IsReleased() or IsHeldFor() to register a key event.',
          this
        )
      }

      const type = typeof commandNameOrFunc

      if (type !== 'string' && type !== 'function') {
        throw new WhenError(
          'Execute() must be called with either a string command name or a ' +
            'handler function as the only argument, but a value of type [' + type + '] was received: ' +
            commandNameOrFunc,
          this
        )
      }

      if (typeof commandNameOrFunc === 'string' && commands[commandNameOrFunc] === undefined) {
        throw new WhenError('Execute() was called with a command name not yet registered by a ' +
          'call to When([command_name]).IsExecuted().Run([function]): ' + commandNameOrFunc, this)
      }

      if (type === 'function' && !commandName) {
        warn(
          'You should provide a string command name as the second argument to Execute() ' +
            'so that When.Documentation() has a name to use, but it is not required and ' +
            'functionality is not effected.',
          this
        )
      }

      this.lastCalledFunctionName = 'Execute()'
      return new Shortcut({
        timeline: this.events,
        command: typeof commandNameOrFunc === 'string' ? commandNameOrFunc : commandName || '',
        handler: typeof commandNameOrFunc === 'function' ? commandNameOrFunc : null,
        mode: this.mode,
        timeConstraint: this.timeConstraint,
        focusTarget: this.focusRequired ? this.focusTarget : null,
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

      commands[this.identifier] = func
      
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

When.setMode = setMode
When.clearMode = clearMode
When.newGroup = newGroup

When.documentation = () => {
  const lines: { combination: string, command: string }[] = []
  Shortcut.map.forEach((shortcut) => {
    lines.push({
      combination: shortcut.combination,
      command: shortcut.command ? shortcut.command : shortcut.handler ? 'anon func' : '',
    })
  })

  return lines
}

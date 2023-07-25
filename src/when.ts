import { CommandMap, Whenable, WhenEventHandler, FocusHandler, WhenEventContext } from './types'
import { keys, validateKeyName, loadLayout, keyGroups } from './keys'
import { Shortcut } from './classes/Shortcut'
import { focusHandlers, setFocus, validateFocusTarget } from './track-focus'
import { WhenError, warn, warnAboutChainOrder, quiet, setQuiet } from './utils/error'
import { setMode, clearMode } from './modes'
import { newGroup } from './groups'
import { documentation } from './documentation'

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

  const milliseconds = multiplier * this.n

  switch (this.nType) {
		case 'held':
			if (this.identifier === null) {
				throw new WhenError('identifier value was null', this)
			}
			const keyName = getKeyFromIdentifier(this.identifier, this)
			validateKeyName(keyName)
			const modifiers = getModifiersFromIdentifier(this.identifier)
      if (keys === null) {
        throw new WhenError('A layout has not been loaded yet.')
      } else if (milliseconds < 500) {
        throw new WhenError(
          'Held events cannot have a hold duration of less than 500 milliseconds, but ' +
            milliseconds + ' were provided.',
          this
        )
      }
      this.events.push({
        type: 'pressed',
        key: keys[keyName.toLowerCase()][0],
        identifier: keyName.toLowerCase(),
				rawIdentifier: this.identifier,
        timestamp: 0, // this isn't necessary for timeline events
        modifiers,
      })
      this.events.push({
        type: 'held',
        key: keys[keyName.toLowerCase()][0],
        identifier: keyName.toLowerCase(),
				rawIdentifier: this.identifier,
        timestamp: 0, // this isn't necessary for timeline events
        duration: milliseconds,
        modifiers,
			})
			this.eventsFromLastIdentifier = this.events.slice(this.events.length - 2);
			this.identifier = null
      break
    case 'constraint':
      if (this.timeConstraint !== null) {
        throw new WhenError(
          'Only one time constraint be placed on a shortcut.',
          this,
        )
      }
      this.timeConstraint = milliseconds
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
    identifier: typeof identifierOrElement !== 'string' ? null : identifierOrElement, // set the identifier that was passed in
    element: typeof identifierOrElement === 'string' ? null : identifierOrElement, // set the identifier that was passed in
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
		eventsFromLastIdentifier: null,


    IsInput() {
      warnAboutChainOrder('IsInput()', this, [
        'When()', 'Then()',
      ])

      // validate identifier
      if (typeof this.identifier !== 'string') {
        throw new WhenError(
          'IsInput() must be called after a string key identifier sequence has been passed to ' +
            'When()/Then(), but currently the identifier is of type [' + typeof this.identifier +
            ']: ' + this.identifier,
          this,
        )
      }

      const sequence = this.identifier.split(' ')
			this.eventsFromLastIdentifier = []

      sequence.forEach((input) => {
        const focusTargetMatch = input.match(/id:[\w_-]+|class:[\w_-]+|\.[\w_-]+|#[\w_-]+/)
        const timeMatch = input.match(/^\((\d+)(s|ms)\)$/)


        if (focusTargetMatch) {
          if (this.focusTarget !== null) {
            throw new WhenError(
              'Only one focus constraint be placed on a shortcut.',
              this,
            )
          }

          this.focusRequired = true
          this.focusTarget = input
        } else if (timeMatch) {
          if (this.timeConstraint !== null) {
            throw new WhenError(
              'Only one time constraint be placed on a shortcut.',
              this,
            )
          }

          const n = Number(timeMatch[1])
          const type = timeMatch[2]
          const ms = n * (type === 's' ? 1000 : 1)
          this.timeConstraint = ms
        } else {
          if (keys === null) {
            throw new WhenError('A layout has not been loaded yet.')
          }

          const keyName = getKeyFromIdentifier(input, this)
          const modifiers = getModifiersFromIdentifier(input)
          validateKeyName(keyName, this)
          this.events.push({
            type: 'pressed',
            key: keys[keyName.toLowerCase()][0],
            identifier: keyName.toLowerCase(),
						rawIdentifier: input,
            timestamp: 0, // this isn't necessary for timeline events
            modifiers,
					})
					if (this.eventsFromLastIdentifier === null) {
						this.eventsFromLastIdentifier = [];
					}
					this.eventsFromLastIdentifier.push(this.events[this.events.length - 1])
					this.identifier = null
        }
      })
      
      this.lastCalledFunctionName = 'IsInput()'
      return this
    },

    // changes current identifier
    Then(identifier: string) {
      warnAboutChainOrder('Then()', this, [
				'When()', 'ModeIs()', 'IsFocused()', 'IsPressed()', 'IsReleased()',
				'Seconds()', 'Milliseconds()', 'Times()',
			])
			
      // register an event if there is an unhandled identifier
      if (this.identifier !== null) {
        this.IsInput()
      }

      // validate identifier
      if (typeof identifier !== 'string') {
        throw new WhenError('Then() must be called with a string key identifier (optionally with modifiers).', this)
			}

			this.identifier = identifier
			this.eventsFromLastIdentifier = null
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
        if (!validateFocusTarget(this.identifier)) {
          throw new WhenError(
            'IsFocused() was called but the string identifier provided to When() was neither an ' +
              '"id:" or a "class:" selector',
            this
          )
        }
      } else if (this.element) {
        if (!this.element.classList || !this.element.classList.contains('when-focus')) {
          warn(
            'IsFocused() was called, but the element provided to When() ' +
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

      if (keys === null) {
        throw new WhenError('A layout has not been loaded yet.')
      }

      const keyName = getKeyFromIdentifier(this.identifier, this)
      validateKeyName(keyName)
      const modifiers = getModifiersFromIdentifier(this.identifier)
      this.events.push({
        type: 'pressed',
        key: keys[keyName.toLowerCase()][0],
        identifier: keyName.toLowerCase(),
				rawIdentifier: this.identifier,
        timestamp: 0, // this isn't necessary for timeline events
        modifiers,
			})
			if (this.eventsFromLastIdentifier === null) {
				this.eventsFromLastIdentifier = [];
			}
			this.eventsFromLastIdentifier.push(this.events[this.events.length - 1])
			this.identifier = null
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

      if (keys === null) {
        throw new WhenError('A layout has not been loaded yet.')
      }

      const keyName = getKeyFromIdentifier(this.identifier, this)
      validateKeyName(keyName)
      const modifiers = getModifiersFromIdentifier(this.identifier)
      this.events.push({
        type: 'released',
        key: keys[keyName.toLowerCase()][0],
				identifier: keyName.toLowerCase(),
				rawIdentifier: this.identifier,
        timestamp: 0, // this isn't necessary for timeline events
        modifiers,
			})
			if (this.eventsFromLastIdentifier === null) {
				this.eventsFromLastIdentifier = [];
			}
			this.eventsFromLastIdentifier.push(this.events[this.events.length - 1])
			this.identifier = null
      this.lastCalledFunctionName = 'IsReleased()'
      return this
    },

    IsHeldFor(n: number | string) {
      warnAboutChainOrder('IsHeldFor()', this, [
        'When()', 'Then()',
      ])

      // validate
      if (this.identifier === null) {
        throw new WhenError('IsHeldFor() cannot be called before a string key identifier has been passed to When() or Then()', this)
      }
      if (typeof n !== 'string' && typeof n !== 'number' || Number(n) < 1) {
        throw new WhenError(
					'IsHeldFor() expects to receive a number greater than 0 ' +
						'or a string like "1s" or "1000ms", but received ' +
						'a value of type [' + typeof n + ']: ' + n,
          this
        )
      }
      
			validateKeyName(getKeyFromIdentifier(this.identifier, this))
			
			this.nType = 'held'
			this.lastCalledFunctionName = 'IsHeldFor()'

			if (typeof n === 'number') {
      	this.n = n
				return this
			} else {
				const match = n.match(/(\d)(s|ms)/);
				if (match === null) {
					throw new WhenError(
						'IsHeldFor() received a string but it didn\'t match the template ' +
							'"1s" or "1000ms"',
						this
					)
				}

				this.n = Number(match[1]);
				switch (match[2]) {
					case 's':
						return this.Seconds();
					case 'ms':
						return this.Milliseconds();
					default:
						throw new WhenError(
							'IsHeldFor() received a string that did not contain "s" or "ms"',
							this
						)
				}
			}
    },

    // ANCHOR time funcs

    Within(n: number | string) {
      warnAboutChainOrder('Within()', this, [
        'Then()', 'IsPressed()', 'IsReleased()', 'Seconds()', 'Milliseconds()', 'Times()'
      ])

      // validate
      if (typeof n !== 'string' && typeof n !== 'number' || Number(n) < 1) {
        throw new WhenError(
					'Within() expects to receive a number greater than 0 ' +
						'or a string like "1s" or "1000ms", but received ' +
						'a value of type [' + typeof n + ']: ' + n,
          this
        )
      }
			
			this.nType = 'constraint'
			this.lastCalledFunctionName = 'Within()'

			if (typeof n === 'number') {
      	this.n = n
				return this
			} else {
				const match = n.match(/(\d)(s|ms)/);
				if (match === null) {
					throw new WhenError(
						'Within() received a string but it didn\'t match the template ' +
							'"1s" or "1000ms"',
						this
					)
				}

				this.n = Number(match[1]);
				switch (match[2]) {
					case 's':
						return this.Seconds();
					case 'ms':
						return this.Milliseconds();
					default:
						throw new WhenError(
							'Within() received a string that did not contain "s" or "ms"',
							this
						)
				}
			}
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
		
		Times(n: number) {
			warnAboutChainOrder('Times()', this, [
        'When()', 'Then()', 'IsPressed()', 'IsReleased()', 'Seconds()', 'Milliseconds()',
      ])

			if (typeof n !== 'number' || n < 2) {
				throw new WhenError(
					`Times() expects to receive a number greater than 1, ' +
						'but a ${typeof n} value was received: ${n}`,
					this
				)
			}

      // register an event if there is an unhandled identifier
      if (this.identifier !== null) {
        this.IsInput()
      }

			if (this.eventsFromLastIdentifier === null) {
				throw new WhenError(
					'Times() cannot be called if the current identifier hasn\'t ' +
						'registered any events yet',
					this
				)
			}

			for (let i = 0; i < n-1; i++) {
				this.events.push(...this.eventsFromLastIdentifier);
			}

      this.lastCalledFunctionName = 'Times()'
      return this
		},

    // ANCHOR Execute()

    Execute(commandNameOrFunc: string | WhenEventHandler, commandName?: string) {
      warnAboutChainOrder('Execute()', this, [
				'When()', 'Then()', 'IsPressed()', 'IsReleased()', 'Seconds()',
				'Milliseconds()', 'PreventDefault()', 'IsInput()', 'Times()',
      ])

      // register an event if there is an unhandled identifier
      if (this.identifier !== null) {
        this.IsInput()
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

			// warn about missing documentation command name
      // if (type === 'function' && !commandName) {
      //   warn(
      //     'You should provide a string command name as the second argument to Execute() ' +
      //       'so that When.Documentation() has a name to use, but it is not required and ' +
      //       'functionality is not effected.',
      //     this
      //   )
      // }

      const hasCompoundNumbers = this.events.some((event) => {
        return event.identifier >= '0' && event.identifier <= '9'
      })

      // if shortcut event timeline contains compound number identifiers ("1" vs "num1" or "numpad1")
      // create two shortcuts, replacing any compound numbers in each with their "num"/"numpad" versions
      if (hasCompoundNumbers) {
        const numRowEvents = this.events.map((event) => {
          if (event.identifier >= '0' && event.identifier <= '9') {
            return {
              ...event,
              identifier: 'num' + event.identifier,
              key: keys!['num' + event.identifier][0],
            }
          } else {
            return event
          }
        })
        const numpadEvents = this.events.map((event) => {
          if (event.identifier >= '0' && event.identifier <= '9') {
            return {
              ...event,
              identifier: 'numpad' + event.identifier,
              key: keys!['numpad' + event.identifier][0],
            }
          } else {
            return event
          }
        })

        // register a shortcut with numpad numbers
        new Shortcut({
          timeline: numpadEvents,
          command: typeof commandNameOrFunc === 'string' ? commandNameOrFunc : commandName || '',
          handler: typeof commandNameOrFunc === 'function' ? commandNameOrFunc : null,
          mode: this.mode,
          timeConstraint: this.timeConstraint,
          focusTarget: this.focusRequired ? this.focusTarget : null,
        })

        this.lastCalledFunctionName = 'Execute()'

        // register a shortcut with num row numbers
        return new Shortcut({
          timeline: numRowEvents,
          command: typeof commandNameOrFunc === 'string' ? commandNameOrFunc : commandName || '',
          handler: typeof commandNameOrFunc === 'function' ? commandNameOrFunc : null,
          mode: this.mode,
          timeConstraint: this.timeConstraint,
          focusTarget: this.focusRequired ? this.focusTarget : null,
        })
      } else {
        this.lastCalledFunctionName = 'Execute()'
        return new Shortcut({
          timeline: this.events,
          command: typeof commandNameOrFunc === 'string' ? commandNameOrFunc : commandName || '',
          handler: typeof commandNameOrFunc === 'function' ? commandNameOrFunc : null,
          mode: this.mode,
          timeConstraint: this.timeConstraint,
          focusTarget: this.focusRequired ? this.focusTarget : null,
        })
      }
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
  }
}

When.setMode = setMode
When.clearMode = clearMode
When.newGroup = newGroup
When.quiet = setQuiet
When.loadLayout = loadLayout
When.documentation = documentation
When.setFocus = setFocus

// stops When from actually handling events
export let shouldCheckEvents = true
When.toggle = () => {
  shouldCheckEvents = !shouldCheckEvents
}
When.pause = () => {
  shouldCheckEvents = false
}
When.unpause = () => {
  shouldCheckEvents = true
}

export let heldInterval: number = 100;
When.setHeldInterval = (n: number) => {
  if (typeof n !== 'number') {
    throw new WhenError(
      'When.setHeldInterval() expects to receive a numberic milliseconds value as the first an only ' +
      'argument, but a [' + typeof n + '] was provided.',
    )
  }

  heldInterval = n
}

When.focusChanges = (func: FocusHandler) => {
  if (typeof func !== 'function') {
    throw new WhenError(
      'When.focusChanges() expects to receive a function as the first an only ' +
      'argument, but a [' + typeof func + '] was provided.',
    )
  }

  focusHandlers.push(func)
}

// grouping mechanism for applying the same focus target to multiple shortcuts
When.focusIs = (focusTarget: string | HTMLElement, shortcuts: Shortcut[]) => {
  if (Array.isArray(shortcuts) === false) {
    throw new WhenError(
      'When.focusIs() must receive an array of shortcuts as its second argument, ' +
      `but a ${typeof shortcuts} was received: ${shortcuts}`,
    )
  }

  if ((focusTarget instanceof HTMLElement) === true) {
    focusTarget = focusTarget as HTMLElement
    if (!focusTarget.classList || !focusTarget.classList.contains('when-focus')) {
      warn(
        'The element provided to When.focusIs() ' +
          'did not have the "when-focus" class assigned to it.',
      )
    }
  }
  
  shortcuts.forEach((shortcut) => {
    shortcut.focusTarget = focusTarget;
	});

	return shortcuts;
}

// grouping mechanism for applying the same focus target to multiple shortcuts
When.modeIs = (modeName: string, shortcuts: Shortcut[]) => {
  if (Array.isArray(shortcuts) === false) {
    throw new WhenError(
      'When.modeIs() must receive an array of shortcuts as its second argument, ' +
      `but a ${typeof shortcuts} was received: ${shortcuts}`,
    )
  }

  shortcuts.forEach((shortcut) => {
    shortcut.mode = modeName;
	});
	
	return shortcuts;
}

// registers an command (named event handler) with a string name
When.command = (commandName: string, func: WhenEventHandler) => {
  if (typeof commandName !== 'string')
    throw new WhenError('When.command did not receive a string command name as the first argument')
  else if (typeof func  !== 'function')
    throw new WhenError('When.command did not receive a function as the second argument')
  
  commands[commandName] = func
};

When.keyGroups = () => {
  return keyGroups
}


// load QWERTY layout by default
When.loadLayout('qwerty')
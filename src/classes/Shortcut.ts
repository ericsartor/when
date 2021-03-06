import { preventDefaultShortcuts } from '../default-prevention'

// helpers
import { generateEventKeyString } from '../utils/generate-event-key-string'
import { commands } from '../when'
import { WhenEvent, WhenEventHandler } from '../types'
import { WhenError } from '../utils/error'
import { createCombinationString } from '../utils/create-combination-string'
import { addDocumentedShortcut } from '../documentation'

export type ShortcutProps = {
  timeline: WhenEvent[],
  command: string | null,
  handler: WhenEventHandler | null,
  mode: string | null,
  timeConstraint?: number | null,
  focusTarget?: HTMLElement | string | null,
  once?: boolean,
  inInput?: boolean,
}

export class Shortcut {

  // counter for creating unique shortcut IDs
  static idCounter: number = 0

  // tracks all shortcuts
  static map: Map<number, Shortcut> = new Map()
  
  // used to prevent triggering a shortcut multiple times on the same "held" event
  lastTriggeredEventId: number | null = null
  
  // when false, this shortcut cannot be triggered
  active: boolean = true

  // used in the "shortcuts" Map as the key
  id: number

  // props
  timeline: WhenEvent[]
  command: string | null
  handler: WhenEventHandler | null
  mode: string | null
  preventDefault: boolean = true
  once: boolean = false
  inInput: boolean = false
  timeConstraint: number | null = null
  focusTarget: HTMLElement | string | null = null

  // created after initialization
  combination: string
  keys: string[]




  constructor({
    timeline,
    command,
    handler,
    mode,
    once,
    inInput,
    timeConstraint,
    focusTarget,
  }: ShortcutProps) {
    // assign id
    this.id = Shortcut.idCounter++

    // add shortcut to the map
    Shortcut.map.set(this.id, this)

    // required props
    this.timeline = timeline
    this.command = command
    this.handler = handler
    this.mode = mode

    // optional props
    this.once = once || this.once
    this.inInput = inInput || this.inInput
    this.timeConstraint = timeConstraint || this.timeConstraint
    this.focusTarget = focusTarget || this.focusTarget

    // create the combination string
    this.combination = createCombinationString(this)

    // create the key identifier array
    this.keys = this.timeline.map((event: WhenEvent) => {
      return event.identifier;
    })

    // turn on preventDefault
    this.timeline.forEach((event) => {
      const eventKeyString = generateEventKeyString(event)
      if (preventDefaultShortcuts.has(eventKeyString)) {
        const count = preventDefaultShortcuts.get(eventKeyString)!
        preventDefaultShortcuts.set(eventKeyString, count + 1)
      } else {
        preventDefaultShortcuts.set(eventKeyString, 1)
      }
    })

    // document this shortcut
    addDocumentedShortcut(this)
  }


  

  remove() {
    Shortcut.map.delete(this.id)

    // decrement prevent default counts
    if (this.preventDefault) {
      this.timeline.forEach((event) => {
        const eventKeyString = generateEventKeyString(event)
        if (preventDefaultShortcuts.has(eventKeyString)) {
          const count = preventDefaultShortcuts.get(eventKeyString)!
          preventDefaultShortcuts.set(eventKeyString, count - 1)
        }
      })
    }
  }

  pause() {
    this.active = false
  }

  unpause() {
    this.active = true
  }

  toggle() {
    this.active = !this.active
  }

  // trigger the command without having fulfilled the shortcut, no context is received
  trigger() {
    // check handler first because command may be filled in for documentation purposes
    if (this.handler) {
      this.handler(undefined)
    } else if (this.command) {
      if (typeof commands[this.command] !== 'function') {
        throw new WhenError(`command "${this.command}" hasn't been been registered as a ` +
          `function with When([command_name]).Run([function])`)
      }
      commands[this.command](undefined)
    }
  }

  // the shortcut can only be executed one time after this is called
  // typically used at the end of a When clause
  Once() {
    this.once = true
    return this
  }

  InInput() {
    this.inInput = true
    return this
  }

  AllowDefault() {
    this.timeline.forEach((event) => {
      const eventKeyString = generateEventKeyString(event)
      if (preventDefaultShortcuts.has(eventKeyString)) {
        const count = preventDefaultShortcuts.get(eventKeyString)!
        preventDefaultShortcuts.set(eventKeyString, count - 1)
      }
    })
    this.preventDefault = false
    return this
  }
}
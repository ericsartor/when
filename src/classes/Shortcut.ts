import { preventDefaultShortcuts } from '../default-prevention'

// helpers
import { generateEventKeyString } from '../utils/generate-event-key-string'
import { commands } from '../when'
import { WhenEvent } from '../types'

export type ShortcutProps = {
  timeline: WhenEvent[],
  command: string,
  timeConstraint?: number | null,
  focusElement?: HTMLElement | null,
  preventDefault?: boolean,
  once?: boolean,
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
  command: string
  preventDefault: boolean = false
  once: boolean = false
  timeConstraint: number | null = null
  focusElement: HTMLElement | null = null




  constructor({
    timeline,
    command,
    preventDefault,
    once,
    timeConstraint,
    focusElement,
  }: ShortcutProps) {
    // assign id
    this.id = Shortcut.idCounter++

    // add shortcut to the map
    Shortcut.map.set(this.id, this)

    // required props
    this.timeline = timeline
    this.command = command

    // optional props
    this.preventDefault = preventDefault || this.preventDefault
    this.once = once || this.once
    this.timeConstraint = timeConstraint || this.timeConstraint
    this.focusElement = focusElement || this.focusElement

    // incremement/create prevent default counts
    if (this.preventDefault) {
      this.timeline.forEach((event) => {
        const eventKeyString = generateEventKeyString(event)
        if (preventDefaultShortcuts.has(eventKeyString)) {
          const count = preventDefaultShortcuts.get(eventKeyString)!
          preventDefaultShortcuts.set(eventKeyString, count + 1)
        } else {
          preventDefaultShortcuts.set(eventKeyString, 1)
        }
      })
    }
  }


  

  delete() {
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

  trigger() {
    // trigger the command without having fulfilled the shortcut, no context is received
    if (typeof commands[this.command] !== 'function') {
      throw `When: command "${this.command}" hasn't been been registered as a ` +
        `function with When([command_name]).Run([function])`
    }
    commands[this.command](undefined)
  }

  // the shortcut can only be executed one time after this is called
  // typically used at the end of a When clause
  Once() {
    this.once = true
    return this
  }
}
// Shortcuts

import { Shortcut } from './classes/Shortcut'

export type ShortcutGroup = {
  shortcuts: Shortcut[],
  
  remove: () => void

  pause: () => void

  unpause: () => void

  toggle: () => void

  trigger: () => void
}

// Events


export type WhenEventType = 'pressed' | 'released' | 'held'

export type WhenEvent = {
  id?: number,
  type: WhenEventType,
  key: string,
	identifier: string,
	rawIdentifier: string,
  timestamp: number,
  duration?: number, // for "held" events
  modifiers: {
    shift: boolean,
    ctrl: boolean,
    alt: boolean,
    meta: boolean,
  },
}

export interface WhenEventContext {
  event: KeyboardEvent,
  shortcut: Shortcut,
  keys: string[],
  focusedElement: HTMLElement | null,
  pressDuration?: number,
  alt: boolean,
  ctrl: boolean,
  shift: boolean,
  meta: boolean,
}

export type WhenEventHandler = (event: WhenEventContext | undefined) => void

// Focus

export type FocusHandler = (newFocusEl: HTMLElement | null, previousFocusEl: HTMLElement | null) => void

// Whenable

export type KeyStatusMap = {
  [key: string]: {
    pressed: boolean,
    timestamp: number | null,
  }
}

export type CommandMap = {
  [command: string]: WhenEventHandler,
}

export type HandlerMap = {
  pressed: { [handlerId: number]: WhenEventHandler },
  released: { [handlerId: number]: WhenEventHandler },
  held: { [handlerId: number]: WhenEventHandler },
}

export type Whenable = {
  identifier: string | null,                // name used to register an event or command

  element: HTMLElement | null,              // element used in focus related requirements for events

  events: WhenEvent[],                      // local record of events required to satisfy shortcut

  timeConstraint: number | null,            // number of milliseconds the entier shortcut must be 
                                            // completed within to trigger it's execution

  focusRequired: boolean,                   // indicates that a focused element is requried for the shortcut

  focusTarget: HTMLElement | string | null, // an HTMLElement, "id:" or "class:" selector

  mode: string | null,                      // mode string that the shortcut checks for

  isCommand: boolean,                       // marks whether the identifier is for a command or not

  preventDefault: boolean,                  // controls if event.preventDefault gets called

  n: number | null,                         // a number that will get multipled to either register a
                                            // "held" event or set a time constraint on the shortcut

  nType: "held" | "constraint" | null       // controls how the "n" value will be used when either
                                            // Seconds() or Milliseconds() is called

  once: boolean,                            // controls if the shortcut should only work once

  inInput: boolean,                         // controls if the shortcut can be trigger if an input if focused

  shortcut: Shortcut | null                 // the actual shortcut, once created with Execute

	lastCalledFunctionName: string,
	
	eventsFromLastIdentifier: WhenEvent[] | null,		// the event(s) added from the last identifier

  IsInput: () => Whenable,                // triggers a pase on the current identifier to create a series of events

  Then: (identifier: string) => Whenable,   // sets current identifier

  IsExecuted: () => Whenable,               // registers current identifier as a command

  ModeIs: (modeName: string) => Whenable,   // registers mode name string

  IsFocused: () => Whenable,                // registers current identifier as focus element

  IsPressed: () => Whenable,                // registers current identifier as a "pressed" event

  IsReleased: () => Whenable,               // registers current identifier as a "released" event

  Seconds: () => Whenable,                  // uses "n * 1000" to either register a "held" event or
                                            // set a time constraint on the shortcut

  Milliseconds: () => Whenable,             // uses "n" to either register a "held" event or set a
                                            // time constraint on the shortcut

  IsHeldFor: (n: number | string) => Whenable, // sets the current n value and sets nValue as "held"

  Within: (n: number | string) => Whenable  // sets the current n value and sets nValue as "constraint"

	Times: (n: number) => Whenable						// repeats the events from the current identifier

  Run: (func: WhenEventHandler) => void     // registers current identifier as a command globally

  Execute: (commandNameOrFunc: string | WhenEventHandler, commandName?: string) => Shortcut    // registers the shortcut globally,
                                            // sets the command name which the shortcut should execute,
                                            // returns a function that removes the shortcut
}


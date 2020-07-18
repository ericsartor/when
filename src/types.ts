// Events

import { Shortcut } from './classes/Shortcut'

export type WhenEventType = 'pressed' | 'released' | 'held'

export type WhenEvent = {
  id?: number,
  type: WhenEventType,
  key: number,
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
  pressDuration?: number,
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

  focusRequired: boolean,

  isCommand: boolean,                       // marks whether the identifier is for a command or not

  preventDefault: boolean,                  // controls if event.preventDefault gets called

  n: number | null,                         // a number that will get multipled to either register a
                                            // "held" event or set a time constraint on the shortcut

  nType: "held" | "constraint" | null       // controls how the "n" value will be used when either
                                            // Seconds() or Milliseconds() is called

  once: boolean,                            // controls if the shortcut should only work once

  shortcut: Shortcut | null                 // the actual shortcut, once created with Execute

  Then: (identifier: string) => Whenable,   // sets current identifier

  IsExecuted: () => Whenable,               // registers current identifier as a command

  IsFocused: () => Whenable,                // registers current identifier as focus element

  IsPressed: () => Whenable,                // registers current identifier as a "pressed" event

  IsReleased: () => Whenable,               // registers current identifier as a "released" event

  Seconds: () => Whenable,                  // uses "n * 1000" to either register a "held" event or
                                            // set a time constraint on the shortcut

  Milliseconds: () => Whenable,             // uses "n" to either register a "held" event or set a
                                            // time constraint on the shortcut

  IsHeldFor: (n: number) => Whenable,       // sets the current n value and sets nValue as "held"

  Within: (n: number) => Whenable           // sets the current n value and sets nValue as "constraint"


  PreventDefault: () => void                // runs event.preventDefault for all related events

  Run: (func: WhenEventHandler) => void     // registers current identifier as a command globally

  Execute: (command: string) => Shortcut    // registers the shortcut globally,
                                            // sets the command name which the shortcut should execute,
                                            // returns a function that removes the shortcut

  FocusChanges: (func: FocusHandler) => void // registers a focus change handler
}


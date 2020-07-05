// Events

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

// Shortcuts

export type ShortcutController = {
  active: boolean,
  delete: () => void,
  pause: () => void,
  unpause: () => void,
  trigger: () => void,
  toggle: () => void,
  Once: () => ShortcutController,
}

export type Shortcut = {
  timeline: WhenEvent[],
  timeConstraint: number | null,
  command: string,
  lastTriggeredEventId: number | null,
  preventDefault: boolean,
  active: boolean,
  once: boolean,
  controller: ShortcutController | null
}

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
  identifier: string,                       // name used to register an event or command

  events: WhenEvent[],                      // local record of events required to satisfy shortcut

  timeConstraint: number | null,            // number of milliseconds the entier shortcut must be 
                                            // completed within to trigger it's execution

  preventDefault: boolean,                  // controls if event.preventDefault gets called

  n: number | null,                         // a number that will get multipled to either register a
                                            // "held" event or set a time constraint on the shortcut

  nType: "held" | "constraint" | null       // controls how the "n" value will be used when either
                                            // Seconds() or Milliseconds() is called

  controller: ShortcutController | null     // contains methods for controlling the Shortcut

  once: boolean,                            // controls if the shortcut should only work once

  shortcut: Shortcut | null                 // the actual shortcut, once created with Execute

  Then: (identifier: string) => Whenable,   // sets current identifier

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

  Execute: (command: string) => ShortcutController // registers the shortcut globally,
                                            // sets the command name which the shortcut should execute,
                                            // returns a function that removes the shortcut
}


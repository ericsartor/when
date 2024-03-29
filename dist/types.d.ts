import { Shortcut } from './classes/Shortcut';
export type ShortcutGroup = {
    shortcuts: Shortcut[];
    remove: () => void;
    pause: () => void;
    unpause: () => void;
    toggle: () => void;
    trigger: () => void;
};
export type WhenEventType = 'pressed' | 'released' | 'held';
export type WhenEvent = {
    id?: number;
    type: WhenEventType;
    key: string;
    identifier: string;
    rawIdentifier: string;
    timestamp: number;
    duration?: number;
    modifiers: {
        shift: boolean;
        ctrl: boolean;
        alt: boolean;
        meta: boolean;
    };
};
export interface WhenEventContext {
    event: KeyboardEvent;
    shortcut: Shortcut;
    keys: string[];
    focusedElement: HTMLElement | null;
    pressDuration?: number;
    alt: boolean;
    ctrl: boolean;
    shift: boolean;
    meta: boolean;
}
export type WhenEventHandler = (event: WhenEventContext | undefined) => void;
export type FocusHandler = (newFocusEl: HTMLElement | null, previousFocusEl: HTMLElement | null) => void;
export type KeyStatusMap = {
    [key: string]: {
        pressed: boolean;
        timestamp: number | null;
    };
};
export type CommandMap = {
    [command: string]: WhenEventHandler;
};
export type HandlerMap = {
    pressed: {
        [handlerId: number]: WhenEventHandler;
    };
    released: {
        [handlerId: number]: WhenEventHandler;
    };
    held: {
        [handlerId: number]: WhenEventHandler;
    };
};
export type Whenable = {
    identifier: string | null;
    element: HTMLElement | null;
    events: WhenEvent[];
    timeConstraint: number | null;
    focusRequired: boolean;
    focusTarget: HTMLElement | string | null;
    mode: string | null;
    isCommand: boolean;
    preventDefault: boolean;
    n: number | null;
    nType: "held" | "constraint" | null;
    once: boolean;
    inInput: boolean;
    shortcut: Shortcut | null;
    lastCalledFunctionName: string;
    eventsFromLastIdentifier: WhenEvent[] | null;
    IsInput: () => Whenable;
    Then: (identifier: string) => Whenable;
    IsExecuted: () => Whenable;
    ModeIs: (modeName: string) => Whenable;
    IsFocused: () => Whenable;
    IsPressed: () => Whenable;
    IsReleased: () => Whenable;
    Seconds: () => Whenable;
    Milliseconds: () => Whenable;
    IsHeldFor: (n: number | string) => Whenable;
    Within: (n: number | string) => Whenable;
    Times: (n: number) => Whenable;
    Run: (func: WhenEventHandler) => void;
    Execute: (commandNameOrFunc: string | WhenEventHandler, commandName?: string) => Shortcut;
};

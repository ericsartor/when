import { CommandMap, Whenable, WhenEventHandler, FocusHandler } from './types';
import { Shortcut } from './classes/Shortcut';
export declare const commands: CommandMap;
export declare function When(identifierOrElement: string | HTMLElement): Whenable;
export declare namespace When {
    var setMode: (modeName: string) => void;
    var clearMode: () => void;
    var newGroup: (shortcuts: Shortcut[]) => import("./types").ShortcutGroup;
    var quiet: () => void;
    var loadLayout: (layoutName: "qwerty") => void;
    var documentation: () => {
        combination: string;
        command: string;
        mode: string;
    }[];
    var setFocus: (el: HTMLElement) => void;
    var toggle: () => void;
    var pause: () => void;
    var unpause: () => void;
    var setHeldInterval: (n: number) => void;
    var focusChanges: (func: FocusHandler) => void;
    var focusIs: (focusTarget: string | HTMLElement, shortcuts: Shortcut[]) => Shortcut[];
    var modeIs: (modeName: string, shortcuts: Shortcut[]) => Shortcut[];
    var command: (commandName: string, func: WhenEventHandler) => void;
    var keyGroups: () => {
        [name: string]: string[];
    } | null;
}
export declare let shouldCheckEvents: boolean;
export declare let heldInterval: number;

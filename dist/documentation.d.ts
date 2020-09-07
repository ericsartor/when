import { Shortcut } from './classes/Shortcut';
export declare const documentedShortcuts: Shortcut[];
export declare const addDocumentedShortcut: (shortcut: Shortcut) => void;
export declare const documentation: () => {
    combination: string;
    command: string;
    mode: string;
}[];

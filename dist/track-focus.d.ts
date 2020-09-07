import { FocusHandler } from './types';
export declare const focusHandlers: FocusHandler[];
export declare let focusedElement: HTMLElement | null;
export declare const setFocus: (el: HTMLElement) => void;
export declare const validateFocusTarget: (focusTarget: string) => boolean;

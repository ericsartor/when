import { WhenEvent } from './types';
export declare const preventDefaultShortcuts: Map<string, number>;
export declare const checkPreventDefault: (event: WhenEvent, browserEvent: KeyboardEvent) => void;

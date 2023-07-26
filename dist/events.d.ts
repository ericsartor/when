import { WhenEvent } from './types';
export declare const eventHistory: WhenEvent[];
export declare const addNewEvent: (event: WhenEvent) => void;
export declare const emitEvent: (event?: WhenEvent) => void;

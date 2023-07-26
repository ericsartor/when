import { WhenEvent, WhenEventHandler } from '../types';
export type ShortcutProps = {
    timeline: WhenEvent[];
    command: string | null;
    handler: WhenEventHandler | null;
    mode: string | null;
    timeConstraint?: number | null;
    focusTarget?: HTMLElement | string | null;
    once?: boolean;
    inInput?: boolean;
};
export declare class Shortcut {
    static idCounter: number;
    static map: Map<number, Shortcut>;
    lastTriggeredEventId: number | null;
    active: boolean;
    id: number;
    timeline: WhenEvent[];
    command: string | null;
    handler: WhenEventHandler | null;
    mode: string | null;
    preventDefault: boolean;
    once: boolean;
    inInput: boolean;
    timeConstraint: number | null;
    focusTarget: HTMLElement | string | null;
    combination: string;
    keys: string[];
    constructor({ timeline, command, handler, mode, once, inInput, timeConstraint, focusTarget, }: ShortcutProps);
    remove(): void;
    pause(): void;
    unpause(): void;
    toggle(): void;
    trigger(): void;
    Once(): this;
    InInput(): this;
    AllowDefault(): this;
}

import { Whenable } from '../types';
export declare class WhenError extends Error {
    whenData: Whenable | null;
    constructor(message: string, whenable?: Whenable);
}
export declare let quiet: boolean;
export declare const setQuiet: () => void;
export declare const warn: (message: string, whenable?: Whenable | undefined) => void;
export declare const warnAboutChainOrder: (funcName: string, whenable: Whenable, expectedFuncs: string[]) => void;

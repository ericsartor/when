import { KeyStatusMap, Whenable } from './types';
import * as qwerty from './layouts/qwerty';
export declare const layouts: {
    qwerty: typeof qwerty;
};
export declare let keys: {
    [key: string]: number;
} | null;
export declare let modifierKeys: number[] | null;
export declare let keyGroups: {
    [name: string]: string[];
} | null;
export declare let keyStatus: KeyStatusMap;
export declare const keyToString: (key: number) => string | null;
export declare const validateKeyName: (name: string, whenable?: Whenable | undefined) => void;
export declare const loadLayout: (layoutName: 'qwerty') => void;

import { KeyStatusMap, Whenable } from './types';
import * as qwerty from './layouts/qwerty';
export declare const layouts: {
    qwerty: typeof qwerty;
};
export declare let keys: {
    [key: string]: string[];
} | null;
export declare let modifierKeys: string[] | null;
export declare let keyGroups: {
    [name: string]: string[];
} | null;
export declare let keyStatus: KeyStatusMap;
export declare const keyToString: (key: string) => string | null;
export declare const validateKeyName: (name: string, whenable?: Whenable) => void;
export declare const loadLayout: (layoutName: 'qwerty') => void;

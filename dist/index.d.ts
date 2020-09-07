import './events';
import { When } from './when';
import { Whenable } from './types';
declare global {
    interface Window {
        When: (identifier: string) => Whenable;
    }
}
export default When;

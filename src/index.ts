import './events'
import { When } from './when'
import { Whenable } from './types'

// extend Window interface to allow the When function to be added globally
declare global {
  interface Window {
    When: (identifier: string) => Whenable,
    // WhenShortcuts: Map<number, Shortcut>,
  }
}

window.When = When
// window.WhenShortcuts = shortcuts

console.log('Hello from When.js!')
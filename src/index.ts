import './events'
import { When } from './when'
import { Whenable } from './types'

// extend Window interface to allow the When function to be added globally
declare global {
  interface Window {
    When: (identifier: string) => Whenable,
  }
}

// make When available in a browser setting
if (typeof window !== 'undefined')
  window.When = When

// make When available in Node
if (typeof module !== 'undefined')
  module.exports = When
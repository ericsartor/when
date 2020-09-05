import './events'
import { When } from './when'
import { Whenable } from './types'

// extend Window interface to allow the When function to be added globally
declare global {
  interface Window {
    When: (identifier: string) => Whenable,
  }
}

export default When

// make When available in a browser setting
window.When = When
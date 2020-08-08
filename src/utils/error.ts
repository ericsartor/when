import { Whenable } from '../types'

export class WhenError extends Error {
  public whenData: Whenable | null

  constructor(message: string, whenable?: Whenable) {
    if (whenable) {
      message += `\n\nLast identifier in chain: "${whenable.identifier}"`
      message += `\nLast succesful chain call: ${whenable.lastCalledFunctionName}`
    }

    super(message)

    this.name = 'WhenError'
    this.whenData = whenable || null
  }
}

// tells When whether or not to emit console warnings
export let quiet = false
export const setQuiet = () => {
  quiet = true
}

export const warn = (message: string, whenable?: Whenable) => {
  if (quiet) return

  message = 'WhenWarning: ' + message

  if (whenable) {
    message += `\n\nLast identifier in chain: "${whenable.identifier}"`
    message += `\nLast succesful chain call: ${whenable.lastCalledFunctionName}`
  }
  
  console.warn(message)
  console.trace()
}

export const warnAboutChainOrder = (
  funcName: string,
  whenable: Whenable,
  expectedFuncs: string[],
) => {
  if (!expectedFuncs.includes(whenable.lastCalledFunctionName)) {
    warn(funcName + ' should not be called after ' + whenable.lastCalledFunctionName + ', though it ' +
      'may still work as intended.', whenable)
  }
}
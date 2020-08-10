import { WhenError } from './utils/error'

export let currentMode: string | null = null

export const setMode = (modeName: string) => {
  if (typeof modeName !== 'string') {
    throw new WhenError(
      'When.setMode did not receive a string its first argument, received: ' + typeof modeName,
    )
  }

  currentMode = modeName
}

export const clearMode = () => {
  currentMode = null
}
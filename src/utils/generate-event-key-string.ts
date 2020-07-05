import { WhenEvent } from '../types'

export const generateEventKeyString = (event: WhenEvent) => {
  const { alt, ctrl, meta, shift } = event.modifiers
  return `${alt?'alt':''}${ctrl?'ctrl':''}${meta?'meta':''}${shift?'shift':''}${event.key}`      
}
import { Shortcut } from './classes/Shortcut'
import { ShortcutGroup } from './types'
import { WhenError } from './utils/error'

export const groups = []

export const newGroup = (shortcuts: Shortcut[]): ShortcutGroup => {
  if (Array.isArray(shortcuts) === false) {
    throw new WhenError(
      'When.newGroup() expects to receive an array of shortcuts as its first and only argument, ' +
        'but a [' + typeof shortcuts + '] was provided.',
    )
  }

  return {
    shortcuts,
    
    remove() {
      shortcuts.forEach((shortcut: Shortcut) => shortcut.remove())
    },
  
    pause() {
      shortcuts.forEach((shortcut: Shortcut) => shortcut.pause())
    },
  
    unpause() {
      shortcuts.forEach((shortcut: Shortcut) => shortcut.unpause())
    },
  
    toggle() {
      shortcuts.forEach((shortcut: Shortcut) => shortcut.toggle())
    },
  
    trigger() {
      shortcuts.forEach((shortcut: Shortcut) => shortcut.trigger())
    }
  }
}
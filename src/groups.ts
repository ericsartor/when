import { Shortcut } from './classes/Shortcut'
import { ShortcutGroup } from './types'

export const groups = []

export const newGroup = (shortcuts: Shortcut[]): ShortcutGroup => {
  return {
    shortcuts,
    
    delete() {
      shortcuts.forEach((shortcut: Shortcut) => shortcut.delete())
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
import { Shortcut, ShortcutController } from './types'
import { preventDefaultShortcuts } from './default-prevention'

// helpers
import { generateEventKeyString } from './utils/generate-event-key-string'
import { commands } from './when'

// counter for creating unique shortcut IDs
let shortcutId = 0

export const shortcuts: Map<number, Shortcut> = new Map()

export const addNewShortcut = (shortcut: Shortcut): ShortcutController => {
  const id = shortcutId++
  shortcuts.set(id, shortcut)

  // incremement/create prevent default counts
  if (shortcut.preventDefault) {
    shortcut.timeline.forEach((event) => {
      const eventKeyString = generateEventKeyString(event)
      if (preventDefaultShortcuts.has(eventKeyString)) {
        const count = preventDefaultShortcuts.get(eventKeyString)!
        preventDefaultShortcuts.set(eventKeyString, count + 1)
      } else {
        preventDefaultShortcuts.set(eventKeyString, 1)
      }
    })
  }

  const controller: ShortcutController = {
    get active() {
      return shortcut.active
    },
    delete() {
      shortcuts.delete(id)

      // decrement prevent default counts
      if (shortcut.preventDefault) {
        shortcut.timeline.forEach((event) => {
          const eventKeyString = generateEventKeyString(event)
          if (preventDefaultShortcuts.has(eventKeyString)) {
            const count = preventDefaultShortcuts.get(eventKeyString)!
            preventDefaultShortcuts.set(eventKeyString, count - 1)
          }
        })
      }
    },
    pause() {
      shortcut.active = false
    },
    unpause() {
      shortcut.active = true
    },
    toggle() {
      shortcut.active = !shortcut.active
    },
    trigger() {
      // trigger the command without having fulfilled the shortcut, no context is received
      if (typeof commands[shortcut.command] !== 'function') {
        throw `When: command "${shortcut.command}" hasn't been been registered as a ` +
          `function with When([command_name]).Run([function])`
      }
      commands[shortcut.command](undefined)
    },
    Once() {
      shortcut.once = true
      return this
    },
  }

  shortcut.controller = controller

  return controller
}
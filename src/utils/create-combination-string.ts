import { Shortcut } from '../classes/Shortcut'
import { keyToString } from '../keys'

export const createCombinationString = (shortcut: Shortcut): string => {
  let shortcutEvents = shortcut.timeline.map((event) => {
    const { alt, ctrl, meta, shift } = event.modifiers
    let modifierString = `${alt?'alt+':''}${ctrl?'ctrl+':''}${meta?'meta+':''}${shift?'shift+':''}`
    switch (event.type) {
      case 'pressed':
        return `, ↓${modifierString}${keyToString(event.key)}`
      case 'released':
        return `, ↑${modifierString}${keyToString(event.key)}`
      case 'held':
        return ` (hold ${event.duration! / 1000}s)`
    }
  })

  let shortcutCombination = shortcutEvents.join('').slice(2)

  if (shortcut.timeConstraint) {
    if (shortcut.timeConstraint < 1000) {
      const milliseconds = shortcut.timeConstraint
      shortcutCombination += ` (within ${milliseconds}ms)`
    } else {
      const seconds = (shortcut.timeConstraint / 1000).toFixed(2)
      shortcutCombination += ` (within ${seconds}s)`
    }
  }

  return shortcutCombination
}
import { Shortcut } from './classes/Shortcut';

export const documentedShortcuts: Shortcut[] = []

type DeduplicationMap = {
  [combination: string]: {
    [focusTarget: string]: {
      [mode: string]: boolean
    }
  }
}
const deduplicationMap: DeduplicationMap = {}
export const addDocumentedShortcut = (shortcut: Shortcut) => {
  const focusTargetString = (shortcut.focusTarget || '')?.toString()
  const modeString = shortcut.mode || ''
  if (deduplicationMap[shortcut.combination]) {
    if (deduplicationMap[shortcut.combination][focusTargetString]) {
      if (deduplicationMap[shortcut.combination][focusTargetString][modeString]) {
        return
      }
    }
  }
  deduplicationMap[shortcut.combination] = {} || deduplicationMap[shortcut.combination]
  deduplicationMap[shortcut.combination][focusTargetString] = {} || deduplicationMap[shortcut.combination][focusTargetString]
  deduplicationMap[shortcut.combination][focusTargetString][modeString] = true
  
  documentedShortcuts.push(shortcut)
}

export const documentation = () => {
  const lines: { combination: string, command: string, mode: string, }[] = []
  documentedShortcuts.forEach((shortcut) => {
    lines.push({
      mode: shortcut.mode || '',
      combination: shortcut.combination,
      command: shortcut.command ? shortcut.command : shortcut.handler ? 'anon func' : '',
    })
  })

  return lines
}
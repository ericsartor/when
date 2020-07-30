export let currentMode: string | null = null

export const setMode = (modeName: string) => {
  currentMode = modeName
}

export const clearMode = () => currentMode = null
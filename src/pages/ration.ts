/** Recette choisie pour la gamelle du jour. Stockée dans le navigateur. */
export const RATION_KEY = 'cavaliercare-ration-du-jour'
export const RATION_EVENT = 'cavaliercare-ration'

export interface TodayRecipe {
  id: string
  title: string
  emoji: string
  at: number
}

export function saveTodayRecipe(recipe: Omit<TodayRecipe, 'at'>) {
  const data: TodayRecipe = { ...recipe, at: Date.now() }
  localStorage.setItem(RATION_KEY, JSON.stringify(data))
  window.dispatchEvent(new Event(RATION_EVENT))
}

export function readTodayRecipe(): TodayRecipe | null {
  try {
    const raw = localStorage.getItem(RATION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as TodayRecipe
    if (new Date(data.at).toDateString() !== new Date().toDateString()) return null
    return data
  } catch {
    return null
  }
}
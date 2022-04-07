export type Weather = 'warm'|'cold'
export type RecipeItem<T> = T & { recipeid: string }
export interface RecipeParams {
  name: string
  description: string
  img?: string
  weather?: Weather
}

export type RecipeProps = RecipeItem<RecipeParams>
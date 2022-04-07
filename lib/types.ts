export type Weather = 'warm'|'cold'

export interface RecipeParams {
  recipeid: string
  name: string
  description: string
  img?: string
  weather?: Weather
}
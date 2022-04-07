export type Weather = 'warm'|'cold'
export type RecipeItem<T> = T & { recipeid: string }
export type IngredientItem<T> = T & { ingredientid: string }
export type StepItem<T> = T & { stepid: string }
export interface RecipeParams {
  name: string
  description: string
  img?: string
  weather?: Weather
}

export interface IngredientParams {
  name: string
  uom: string
  quantity: string
}

export interface StepParams {
  sortkey: string
  value: string
}

export interface FullRecipeParams extends RecipeParams {
  ingredients: IngredientParams[]
  steps: StepParams[]
}

export interface FullRecipeProps extends RecipeProps {
  ingredients: IngredientProps[]
  steps: StepProps[]
}


export type RecipeProps = RecipeItem<RecipeParams>
export type IngredientProps = IngredientItem<RecipeItem<IngredientParams>>
export type StepProps = StepItem<RecipeItem<StepParams>>
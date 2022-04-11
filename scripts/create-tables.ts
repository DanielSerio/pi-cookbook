import knex, { Knex } from "knex";

export async function createTables(): Promise<Error|null> {
  function createRecipeTable(builder: Knex.TableBuilder) {
    builder.string('recipeid').unique().primary()
    builder.string('name').unique()
    builder.text('description')
    builder.string('img').nullable()
    builder.string('weather').nullable()
  }

  function createIngredientTable(builder: Knex.TableBuilder) {
    builder.string('ingredientid').unique().primary()
    builder.string('name')
    builder.string('uom')
    builder.string('quantity')
    builder.string('recipeid').references('recipe.recipeid')
  }

  function createStepTable(builder: Knex.TableBuilder) {
    builder.string('stepid').unique().primary()
    builder.string('sortkey')
    builder.text('value')
    builder.string('recipeid').references('recipe.recipeid')
  }

  try {
    const hasRecipeTable: boolean = await knex('recipes').schema.hasTable('recipe')
    const hasIngredientTable: boolean = await knex('recipes').schema.hasTable('ingredient')
    const hasStepTable: boolean = await knex('recipes').schema.hasTable('step')
  
    if (!hasRecipeTable) await knex('recipes').schema.createTable('recipe', createRecipeTable)
    if (!hasIngredientTable) await knex('recipes').schema.createTable('ingredient', createIngredientTable)
    if (!hasStepTable) await knex('recipes').schema.createTable('step', createStepTable)

    return null
    
  } catch (e: unknown) { return e as Error }
}
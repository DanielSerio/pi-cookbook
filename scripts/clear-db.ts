import knex from "knex";

(async function clearDB(): Promise<void> {
  await knex('recipes').delete('*').from('recipe')
  await knex('recipes').delete('*').from('ingredient')
  await knex('recipes').delete('*').from('step')

  return
})()
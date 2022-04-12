import { unlinkSync } from "fs";
import knex from "knex";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false
  }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toUpperCase() === 'DELETE') {
    const { id } = req.query
    const recipeid: string = id as string
    try {
      const recipes = await knex('recipes').select('*').where({ recipeid })
      const imgResult: string|null =  recipes[0] ? recipes[0].img : null

      if (imgResult) await unlinkSync(`${process.cwd()}/public/img/${imgResult}`)
      const recipeResult = await knex('recipes').delete('*').from('recipe').where({ recipeid })
      const ingredientsResult = await knex('recipes').delete('*').from('ingredient').where({ recipeid })
      const stepResult = await knex('recipes').delete('*').from('step').where({ recipeid })   
  

      res.status(200)
      res.json({ ...recipeResult, ...ingredientsResult, ...stepResult})
      return res.end()
    } catch (e) {
      res.status(500)
      res.json({ error: (e as Error).message})
      return res.end()
    }
  }
}
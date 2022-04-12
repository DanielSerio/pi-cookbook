import { NextApiRequest, NextApiResponse } from "next";
import { Fields, Files, IncomingForm, File } from 'formidable'
import { getUUID } from "../../lib/uuild";
import { Weather, IngredientParams, IngredientProps, RecipeProps, StepParams, StepProps } from "../../lib/types";
import knex from "knex";
import { existsSync, openSync, readFileSync, writeFileSync } from "fs";
import PersistentFile from "formidable/PersistentFile";

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toUpperCase() === 'POST') {
    const form = new IncomingForm()

    return await form.parse(req, (err: any, fields: Fields, files: Files) => {
      async function createIngredients(ingredients: IngredientParams[]) {
        const newIngredients: IngredientProps[] = ingredients.map((ingredient: IngredientParams) => {
          const uuid: string = getUUID()
          return {
            ...ingredient,
            recipeid,
            ingredientid: uuid
          }
        })
        return await knex('recipes').batchInsert('ingredient', newIngredients)
      }
      
      async function createSteps(steps: StepParams[]) {
        const newSteps: StepProps[] = steps.map((step: StepParams) => {
          const uuid: string = getUUID()
          return {
            ...step,
            recipeid,
            stepid: uuid
          }
        })
        return await knex('recipes').batchInsert('step', newSteps)
      }

      async function createRecipe(recipe: RecipeProps, file?: PersistentFile|any) {
        const mime: string = file.mimetype?.replace('image/', '') || 'jpg'
        const newRecipe = {
          ...recipe,
          img: file ? `${file.newFilename}.${mime === 'png' ? 'png' : 'jpg'}` :  null,
          recipeid
        }
        return await knex('recipes').insert(newRecipe).into('recipe')
      }

      async function downloadImage(file: File) {
        const mime: string = file.mimetype?.replace('image/', '') || 'jpg'
        const data: string = await readFileSync(file.filepath, { encoding: 'base64'})
        const url: string = `${process.cwd()}/public/img/${file.newFilename}.${mime === 'png' ? 'png' : 'jpg'}`

        const fileExists: boolean = await existsSync(url)
        if (!fileExists) await openSync(url, 'w+')
        await writeFileSync(url,  data)
      }

      if (err) {
        res.status(500)
        res.json(err)
        return res.end()
      }
      const recipeid: string = getUUID()
      const ingredients: IngredientParams[] = JSON.parse(fields.ingredients as string)
      const steps: StepParams[] = JSON.parse(fields.steps as string)
      const recipe = {
        recipeid,
        name: fields.name as string,
        description: fields.description as string,
        weather: fields.weather as (undefined|Weather)
      }

      return Promise.all([
        files.img ? downloadImage(files.img as File) : async () => {},
        createRecipe(recipe, files.img),
        createIngredients(ingredients),
        createSteps(steps)
      ]
      )
      .then(() => {
        res.json({ created: recipeid })
        res.status(200)
        return res.end()
      })
      .catch((e: unknown) => {
        res.status(500)
        res.json({ error: e })
        return res.end()
      })
    })
  }
}
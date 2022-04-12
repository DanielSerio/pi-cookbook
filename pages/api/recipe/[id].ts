import { Fields, File, IncomingForm } from "formidable";
import { existsSync, openSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import knex from "knex";
import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { StepProps, IngredientProps, RecipeProps, StepParams } from "../../../lib/types";
import { getUUID } from "../../../lib/uuild";

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
  } else if (req.method?.toUpperCase() === 'PUT') {
    const { id } = req.query
    const recipeid: string = id as string
    const form = new IncomingForm()

    form.parse(req, (err, fields, files) => {
      const newIngredients = JSON.parse(fields.ingredients as string)
      const newSteps = JSON.parse(fields.steps as string)

      if (err) {
        res.status(500)
        res.json({ error: (err as Error).message})
        return res.end()
      }

      async function removeOldImage(filename: string) {
        const dir: string = process.cwd()
        const url: string = resolve(dir, `/public/img/${filename}`)
        console.log(url)
        return await unlinkSync(`${process.cwd()}/public/img/${filename}`)
      }

      async function downloadImage(file: File, name: string) {
        const mime: string = file.mimetype?.replace('image/', '') || 'jpg'
        const data: string = await readFileSync(file.filepath, { encoding: 'base64'})
          .replace(/^data:image\/png;base64,/, '')
        const url: string = `${process.cwd()}/public/img/${name}.${mime === 'png' ? 'png' : 'jpg'}`

        const fileExists: boolean = await existsSync(url)
        if (!fileExists) await openSync(url, 'w+')
        await writeFileSync(url,  `${data}`, 'base64')
      }

      async function getCurrent(): Promise<RecipeProps> {
        const recipes = await knex('recipes').select('*').from('recipe').where({ recipeid })
        return recipes[0]
      }
      return getCurrent()
        .then((currentRecipe: RecipeProps) => {
            function sameIngredient(ing1: IngredientProps, ing2: IngredientProps): boolean {
              return (
                ing1.name === ing2.name &&
                ing1.quantity === ing2.quantity &&
                ing1.uom === ing2.uom
              )
            }

            function sameIngredients(ings1: IngredientProps[], ings2: IngredientProps[]): boolean {
              if (ings1.length !== ings2.length) return false
              return !ings1.some((ing: IngredientProps) => {
                const compare: IngredientProps = ings2.filter((i: IngredientProps) => i.ingredientid === ing.ingredientid)[0]
                return !sameIngredient(ing, compare)
              })
            }

            function sameStep(step1: StepProps, step2: StepProps): boolean {
              return (
                step1.value === step2.value &&
                step1.sortkey === step2.sortkey  
              )
            }

            function sameSteps(steps1: StepProps[], steps2: StepProps[]): boolean {
              if (steps1.length !== steps2.length) return false
              return !steps1.some((step: StepProps) => {
                const compare: StepProps = steps2.filter((i: StepProps) => i.stepid === step.stepid)[0]
                return !sameStep(step, compare)
              })
            }

            function sameRecipe() {
              return (
                fields.name === currentRecipe.name &&
                fields.description === currentRecipe.description &&
                fields.weather === currentRecipe.weather && 
                !files.img
              )
            }

            if (!sameRecipe()) {
              const mime: string = (files.img as File).mimetype?.replace('image/', '') || 'jpg'
              let name: string = `${getUUID()}`
              console.log(files)
              if (files.img !== undefined && (files.img as Array<any>).push === undefined) {
                const dir: string = process.cwd()
                const path: string = resolve(dir, `public/img/${currentRecipe.img}`)
                if (existsSync(path)) removeOldImage(currentRecipe.img as string)
                  
                downloadImage(files.img as File, name)
              }

              knex('recipes').from('recipe').update({
                recipeid,
                name: fields.name,
                description: fields.description,
                img: files.img !== undefined ? `${name}.${mime === 'jpeg' ? 'jpg' : 'png'}` : '',
                weather: fields.weather || ''
              }).then(() => {
                knex('recipes').select('*').from('ingredient').where({ recipeid })
                .then((ingredients: IngredientProps[]) => {
                  if (!sameIngredients(ingredients, newIngredients)) knex('recipes').upsert(ingredients).from('ingredient')
  
                  knex('recipes').select('*').from('step').where({ recipeid })
                  .then((steps: StepProps[]) => {
                    if (!sameSteps(steps, newSteps)) knex('recipes').upsert(steps).from('step')
                    res.status(200)
                    res.json({
                      name: fields.name,
                      description: fields.description,
                      img: fields.img,
                      weather: fields.weather,
                      steps,
                      ingredients
                    })
                    return res.end()
                  })
                })
              })
            }
        })
        .catch((err) => {
          console.log('Initial')
          console.error(err)
          res.json({ error: err })
          res.status(500)
          return res.end()
        })
    })
  }
}
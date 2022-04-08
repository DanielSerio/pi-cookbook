import { GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { EditRecipeForm } from '../../components/forms';
import { Page } from '../../components/layout';
import { FullRecipeProps, RecipeProps } from '../../lib/types';
import { getUUID } from '../../lib/uuild';


type FullRecipeProp = { recipe: FullRecipeProps }

const EditPage: NextPage<FullRecipeProp> = ({ recipe }: FullRecipeProp) => {


  return (
    <Page title={`${recipe.name} | Edit`} description={`${recipe.name}`}>
      <EditRecipeForm recipe={recipe}/>
    </Page>
  );
}


export const getStaticProps = async (context: { params: { id: string } }) => {
  const recipe = await new Promise<FullRecipeProps>((resolve) => {
    const testValues: FullRecipeProps[] = [
      {
        name: 'Test Recipe One',
        description: 'Test Recipe One Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae dolorem at! Incidunt maiores veritatis quidem dolorum nobis totam accusantium molestiae corporis aliquid sint officia mollitia soluta, eaque debitis eveniet!',
        recipeid: getUUID(),
        weather: 'warm',
        img: 'test-one.jpg',
        ingredients: [
          {
            recipeid: context.params.id,
            name: 'Test Ingredient One',
            quantity: '1.2',
            uom: 'test uom',
            ingredientid: getUUID()
          },
          {
            recipeid: context.params.id,
            name: 'Test Ingredient Two',
            quantity: '2.13',
            uom: 'test uom two',
            ingredientid: getUUID()
          }
        ],
        steps: [
          {
            recipeid: context.params.id,
            value: 'Test Step One',
            sortkey: 'a',
            stepid: getUUID()
          }
        ]
      },
      {
        name: 'Test Recipe Two',
        description: 'Test Recipe Two Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae dolorem at! Incidunt maiores veritatis quidem dolorum nobis totam accusantium molestiae corporis aliquid sint officia mollitia soluta, eaque debitis eveniet!',
        recipeid: context.params.id,
        weather: 'cold',
        img: 'test-two.jpeg',
        ingredients: [
          {
            recipeid: context.params.id,
            name: 'Test Ingredient One',
            quantity: '1.2',
            uom: 'test uom',
            ingredientid: getUUID()
          },
          {
            recipeid: context.params.id,
            name: 'Test Ingredient Two',
            quantity: '2.13',
            uom: 'test uom two',
            ingredientid: getUUID()
          }
        ],
        steps: [
          {
            recipeid: context.params.id,
            value: 'Test Step One',
            sortkey: 'a',
            stepid: getUUID()
          }
        ]
      },
      {
        name: 'Test Recipe Three',
        description: 'Test Recipe Three Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae dolorem at! Incidunt maiores veritatis quidem dolorum nobis totam accusantium molestiae corporis aliquid sint officia mollitia soluta, eaque debitis eveniet!',
        recipeid: getUUID(),
        img: 'test-three.jpg',
        ingredients: [
          {
            recipeid: context.params.id,
            name: 'Test Ingredient One',
            quantity: '1.2',
            uom: 'test uom',
            ingredientid: getUUID()
          },
          {
            recipeid: context.params.id,
            name: 'Test Ingredient Two',
            quantity: '2.13',
            uom: 'test uom two',
            ingredientid: getUUID()
          }
        ],
        steps: [
          {
            recipeid: context.params.id,
            value: 'Test Step One',
            sortkey: 'a',
            stepid: getUUID()
          }
        ]
      }
    ]
    setTimeout<RecipeProps[]>(() => {
      resolve(testValues.filter((r: FullRecipeProps) =>r.recipeid === context.params.id)[0])
    }, 1100)

  })


  return {
    props: {
      recipe: recipe
    }
  }
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {

  return {
      paths: [], 
      fallback: 'blocking'
  }
}


export default EditPage
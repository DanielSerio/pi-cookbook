import knex from 'knex';
import { GetStaticPaths, NextPage } from 'next';
import React from 'react';
import { EditRecipeForm } from '../../components/forms';
import { DeleteRecipeForm } from '../../components/forms/DeleteForm';
import { Page } from '../../components/layout';
import { FullRecipeProps, IngredientProps, RecipeProps, StepProps } from '../../lib/types';



type FullRecipeProp = { recipe: FullRecipeProps }

const EditPage: NextPage<FullRecipeProp> = ({ recipe }: FullRecipeProp) => {


  return (
    <Page title={`${recipe.name} | Edit`} description={`${recipe.name}`}>
      <EditRecipeForm recipe={recipe}/>
      <DeleteRecipeForm recipeName={recipe.name} recipeid={recipe.recipeid}/>
    </Page>
  );
}


export const getStaticProps = async (context: { params: { id: string } }) => {
  const recipeid: string = context.params.id
  const recipes = await knex('recipes').select('*').from('recipe').where({ recipeid })
  if (!recipes[0]) {
    return {
      notFound: true
    }
  }
  const recipe: RecipeProps = recipes[0]
  const ingredients: IngredientProps[] = await knex('recipes').select('*').from('ingredient').where({ recipeid })
  const steps: StepProps[] = await knex('recipes').select('*').from('step').where({ recipeid })

  const fullRecipe: FullRecipeProps = {
    ...recipe,
    ingredients,
    steps
  }

  return {
    props: {
      recipe: fullRecipe
    }
  }
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {

  return {
      paths: [], 
      fallback: 'blocking',
  }
}


export default EditPage
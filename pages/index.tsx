import { Box, Text } from '@mantine/core'
import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { Suspense } from 'react'
import { Page } from '../components/layout'
import { RecipeParams } from '../lib/types'

interface HomePageProps {
  recipes: RecipeParams[]
}


const Home: NextPage<HomePageProps> = ({ recipes }: HomePageProps) => {
  return (
    <Page title="Cookbook | Home" description="Raspberry PI self-hosted cookbook">
      {recipes.length && recipes.map((recipe: RecipeParams) => {
        return (
          <Box key={recipe.recipeid}>
            <Text>{recipe.name}</Text>
          </Box>
        )
      })}
    </Page>
  )
}


export const getServerSideProps = async () => {
  const recipes = await new Promise<RecipeParams[]>((resolve) => {
    const testValues: RecipeParams[] = [
      {
        name: 'Test Recipe One',
        description: 'Test Recipe One Description',
        recipeid: 'qqqq-qqqq-qqqq-qqqq'
      },
      {
        name: 'Test Recipe Two',
        description: 'Test Recipe Two Description',
        recipeid: 'rrrr-qqqq-qqqq-qqqq'
      },
      {
        name: 'Test Recipe Three',
        description: 'Test Recipe Three Description',
        recipeid: 'ssss-qqqq-qqqq-qqqq'
      }
    ]
    setTimeout<RecipeParams[]>(() => {
      resolve(testValues)
    }, 1100)

  })


  return {
    props: {
      recipes: recipes
    }
  }
}

export default Home

import { Box, Text } from '@mantine/core'
import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { Suspense } from 'react'
import { Page } from '../components/layout'
import { RecipeCardList } from '../components/lists'
import { RecipeParams } from '../lib/types'

interface HomePageProps {
  recipes: RecipeParams[]
}


const Home: NextPage<HomePageProps> = ({ recipes }: HomePageProps) => {
  return (
    <Page title="Cookbook | Home" description="Raspberry PI self-hosted cookbook">
      {recipes.length && <RecipeCardList recipes={recipes} />}
    </Page>
  )
}


export const getServerSideProps = async () => {
  const recipes = await new Promise<RecipeParams[]>((resolve) => {
    const testValues: RecipeParams[] = [
      {
        name: 'Test Recipe One',
        description: 'Test Recipe One Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae dolorem at! Incidunt maiores veritatis quidem dolorum nobis totam accusantium molestiae corporis aliquid sint officia mollitia soluta, eaque debitis eveniet!',
        recipeid: 'qqqq-qqqq-qqqq-qqqq',
        weather: 'warm',
        img: 'test-one.jpg'
      },
      {
        name: 'Test Recipe Two',
        description: 'Test Recipe Two Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae dolorem at! Incidunt maiores veritatis quidem dolorum nobis totam accusantium molestiae corporis aliquid sint officia mollitia soluta, eaque debitis eveniet!',
        recipeid: 'rrrr-qqqq-qqqq-qqqq',
        weather: 'cold',
        img: 'test-two.jpeg'
      },
      {
        name: 'Test Recipe Three',
        description: 'Test Recipe Three Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae dolorem at! Incidunt maiores veritatis quidem dolorum nobis totam accusantium molestiae corporis aliquid sint officia mollitia soluta, eaque debitis eveniet!',
        recipeid: 'ssss-qqqq-qqqq-qqqq',
        img: 'test-three.jpg'
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

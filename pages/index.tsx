import { Box, Container, Text } from '@mantine/core'
import axios, { AxiosResponse } from 'axios'
import knex from 'knex'
import type { NextPage } from 'next'
import { Suspense } from 'react'
import { Page } from '../components/layout'
import { RecipeCardList } from '../components/lists'
import { RecipeParams, RecipeProps } from '../lib/types'
import { getUUID } from '../lib/uuild'

interface HomePageProps {
  recipes: RecipeProps[]
}


const Home: NextPage<HomePageProps> = ({ recipes }: HomePageProps) => {
  return (
    <Page title="Cookbook | Home" description="Raspberry PI self-hosted cookbook">
      {!recipes || !recipes.length && <Text sx={{ fontSize: 48, textAlign: 'center' }} color={'dimmed'}>No recipes</Text>}
      {Boolean(recipes.length) && (
        <Container sx={{maxWidth: 1300 }}>
          <RecipeCardList recipes={recipes} />
        </Container>
      )}
    </Page>
  )
}


export const getServerSideProps = async () => {
  const recipes = await knex('recipes').select('*').from('recipe')


  return {
    props: {
      recipes: !recipes ? [] : recipes
    }
  }
}

export default Home

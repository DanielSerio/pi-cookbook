import { Text } from '@mantine/core'
import type { NextPage } from 'next'
import { Page } from '../components/layout'


const Home: NextPage = () => {
  return (
    <Page title="Cookbook | Home" description="Raspberry PI self-hosted cookbook">
      <Text>Home</Text>
    </Page>
  )
}

export default Home

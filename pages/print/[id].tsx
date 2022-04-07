import { Box, Button, createStyles, CSSObject, MantineTheme, Text, Title } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Printer } from 'tabler-icons-react';
import { RecipeParams } from '../../lib/types';
import { getUUID } from '../../lib/uuild';

interface PrintPageProps {
  recipes: RecipeParams[]
  recipeid: string
}

function createPrintStyles(t: MantineTheme): Record<string, CSSObject> {
  return ({
    root: {
      margin: t.spacing.xl,
      color: '#111',
      background: 'transparent',

      '& p': {
        maxWidth: '80ch'
      },

      [`@media print`]: {
        '& p': {
          display: 'none'
        },
        '& button': {
          display: 'none'
        }
      }
    }
  })
}

const usePrintStyles = createStyles(createPrintStyles)

const Print: NextPage<PrintPageProps> = ({ recipes, recipeid }: PrintPageProps) => {
  const { query } = useRouter()
  const { classes } = usePrintStyles()
  const recipe = recipes[0]
  return (
    <Box className={classes.root}>
      <Head>
        <title key={0}>{`Print | ${recipe.name}`}</title>
        <meta key={1} name="description" content={recipe.description} />
        <link key={2} rel="icon" href="/favicon.ico" />
      </Head>
      <Title order={1}>{recipe.name}</Title>
      <Text component='p'>{recipe.description}</Text>
      <Button mt={'xl'} leftIcon={<Printer size={16} />}>Print</Button>
    </Box>
  )
}


export const getServerSideProps = async () => {
  const recipes = await new Promise<RecipeParams[]>((resolve) => {
    const testValues: RecipeParams[] = [
      {
        name: 'Test Recipe One',
        description: 'Test Recipe One Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae dolorem at! Incidunt maiores veritatis quidem dolorum nobis totam accusantium molestiae corporis aliquid sint officia mollitia soluta, eaque debitis eveniet!',
        recipeid: getUUID(),
        weather: 'warm',
        img: 'test-one.jpg'
      },
      {
        name: 'Test Recipe Two',
        description: 'Test Recipe Two Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae dolorem at! Incidunt maiores veritatis quidem dolorum nobis totam accusantium molestiae corporis aliquid sint officia mollitia soluta, eaque debitis eveniet!',
        recipeid: getUUID(),
        weather: 'cold',
        img: 'test-two.jpeg'
      },
      {
        name: 'Test Recipe Three',
        description: 'Test Recipe Three Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae dolorem at! Incidunt maiores veritatis quidem dolorum nobis totam accusantium molestiae corporis aliquid sint officia mollitia soluta, eaque debitis eveniet!',
        recipeid: getUUID(),
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

export default Print
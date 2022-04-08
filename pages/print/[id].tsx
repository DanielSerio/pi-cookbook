import { Box, Button, createStyles, CSSObject, Image, List, MantineTheme, Text, Title } from '@mantine/core';
import { GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import React, { useCallback } from 'react';
import { Printer } from 'tabler-icons-react';
import { FullRecipeProps, IngredientProps, StepProps } from '../../lib/types';
import { getUUID } from '../../lib/uuild';

interface PrintPageProps {
  recipe: FullRecipeProps
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
        '& p,& button,& img': {
          display: 'none'
        }
      }
    }
  })
}

const usePrintStyles = createStyles(createPrintStyles)

const Print: NextPage<PrintPageProps> = ({ recipe }: PrintPageProps) => {
  const { classes } = usePrintStyles()

  const handlePrintClick = useCallback(function handlePrintClick() {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }, [])

  return (
    <Box className={classes.root}>
      <Head>
        <title key={0}>{`Print | ${recipe.name}`}</title>
        <meta key={1} name="description" content={recipe.description} />
        <link key={2} rel="icon" href="/favicon.ico" />
      </Head>
      <Title order={1}>{recipe.name}</Title>
      {recipe.img && <Image my={'xl'} src={`/img/${recipe.img}`} alt={recipe.name} width={'100%'}></Image>}
      <Text component='p'>{recipe.description}</Text>
      <Title order={2}>Ingredients</Title>
      <List my={'sm'}>
        {recipe.ingredients.map((ingredient: IngredientProps, i: number) => {
          return (
            <List.Item key={ingredient.ingredientid}>
              {ingredient.quantity} {ingredient.uom} {ingredient.name}
            </List.Item>
          )
        })}
      </List>
      <Title order={3}>Steps</Title>
      <List my={'sm'} type="ordered">
        {recipe.steps.map((step: StepProps, i: number) => {
          return (
            <List.Item key={step.stepid}>{step.value}</List.Item>
          )
        })}
      </List>
      <Button 
        mt={'xl'} 
        leftIcon={<Printer size={16} />}
        onClick={handlePrintClick}>Print</Button>
    </Box>
  )
}


export const getStaticProps = async (context: { params: { id: string }}) => {
  const recipe = await new Promise<FullRecipeProps>((resolve) => {
    const recipeid: string = context.params.id
    const testValues: FullRecipeProps[] = [
      {
        name: 'Test Recipe One',
        description: 'Test Recipe One Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa repudiandae dolorem at! Incidunt maiores veritatis quidem dolorum nobis totam accusantium molestiae corporis aliquid sint officia mollitia soluta, eaque debitis eveniet!',
        recipeid,
        weather: 'warm',
        img: 'test-one.jpg',
        ingredients: [
          {
            recipeid,
            ingredientid: getUUID(),
            name: 'Test Ingredient One',
            quantity: '1',
            uom: 'lb'
          }
        ],
        steps: [
          {
            recipeid,
            stepid: getUUID(),
            value: 'Test Step One',
            sortkey: '1'
          }
        ]
      }
    ]
    setTimeout<FullRecipeProps[]>(() => {
      resolve(testValues[0])
    }, 1100)

  })


  return {
    props: {
      recipe
    }
  }
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {

  return {
      paths: [], 
      fallback: 'blocking'
  }
}


export default Print
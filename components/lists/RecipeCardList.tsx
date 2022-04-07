import { Image, Badge, Box, Button, Card, createStyles, CSSObject, Group, Text, ThemeIcon, Grid, SimpleGrid, Title } from '@mantine/core';
import React from 'react';
import { Printer, Tool } from 'tabler-icons-react';
import { RecipeParams } from '../../lib/types';

export interface RecipeCardListProps {
  recipes: RecipeParams[]
}

function createRecipeListStyles(): Record<string, CSSObject> {
  return ({
    cardButton: {
      padding: '0.4ch',
      height: 24,
      width: 24
    }
  })
}



const useRecipeListStyles = createStyles(createRecipeListStyles)

export function RecipeCardList({ recipes }: RecipeCardListProps) {
  const { classes } = useRecipeListStyles()
  return (

    <SimpleGrid 
      my={'xl'}
      cols={4}
      spacing="lg"
      mx={'auto'}
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'lg' },
        { maxWidth: 600, cols: 1, spacing: 'xl' },
      ]}>
      {recipes.length && recipes.map((recipe: RecipeParams) => {
        return (
          <Card key={recipe.recipeid} shadow={'md'}>
            <Card.Section>
              <Image height={160} src={`/img/${recipe.img || 'none.png'}`} alt={recipe.name} />
            </Card.Section>
            <Title my={'xl'} order={2} sx={{ fontSize: '1.25rem'}}>{recipe.name}</Title>
            <Text my={'xl'} size={'xs'} lineClamp={3} sx={{maxWidth: '60ch' }}>{recipe.description}</Text>
            <Group position={recipe.weather ? 'apart' : 'right'} my={'md'}>
            {recipe.weather && (
              <Box>
                <Badge color={recipe.weather === 'cold' ? 'indigo' : 'orange'}>{recipe.weather}</Badge>
              </Box>
            )}
            <Box>
              <Group>
                <Button className={classes.cardButton} color={'gray'} component={ThemeIcon} variant='subtle'>
                    <Tool />
                </Button>
                <Button className={classes.cardButton} color={'gray'} component={ThemeIcon} variant='subtle'>
                    <Printer />
                </Button>
              </Group>
            </Box>
            </Group>
          </Card>
        )
      })}
    </SimpleGrid>
  );
}

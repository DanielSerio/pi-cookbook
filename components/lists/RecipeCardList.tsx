import { Card, Group, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import { RecipeParams } from '../../lib/types';

export interface RecipeCardListProps {
  recipes: RecipeParams[]
}

export function RecipeCardList({ recipes }: RecipeCardListProps) {
  return (
    <Group>
      {recipes.length && recipes.map((recipe: RecipeParams) => {
        return (
          <Card key={recipe.recipeid}>
            <Card.Section>
              <Image src={recipe.img || 'none.jpg'} alt={recipe.name} />
            </Card.Section>
            <Text lineClamp={3}>{recipe.description}</Text>
          </Card>
        )
      })}
    </Group>
  );
}

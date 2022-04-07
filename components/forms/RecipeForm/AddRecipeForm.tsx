import { Container, createStyles, SimpleGrid } from '@mantine/core';
import React from 'react';
import { Form, FormSection } from './Form';
import { createFormStyles } from './styles';

const create = createFormStyles
const useFormStyles = createStyles(create)

export function AddRecipeForm() {
  const { classes } = useFormStyles()
  return (
    <Form>
      <Container>
        <SimpleGrid cols={1} breakpoints={[
          {
            minWidth: 600,
            cols: 2
          }
        ]}>
          <FormSection title="General">
            <span>General</span>
          </FormSection>
          <FormSection title="Image">
            <span>Image</span>
          </FormSection>
          <FormSection className={classes.full} title="Weather">
            <span>Weather</span>
          </FormSection>
          <FormSection className={classes.full} title="Ingredients">
            <span>Ingredients</span>
          </FormSection>
          <FormSection className={classes.full} title="Steps">
            <span>Steps</span>
          </FormSection>
        </SimpleGrid>
      </Container>
    </Form>
  );
}

import { Container, SimpleGrid } from '@mantine/core';
import React from 'react';
import { Form, FormSection } from './Form';

export function AddRecipeForm() {
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
          <FormSection title="Weather">
            <span>Weather</span>
          </FormSection>
          <FormSection title="Ingredients">
            <span>Ingredients</span>
          </FormSection>
          <FormSection title="Steps">
            <span>Steps</span>
          </FormSection>
        </SimpleGrid>
      </Container>
    </Form>
  );
}

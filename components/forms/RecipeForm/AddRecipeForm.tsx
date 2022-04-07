import { Container, createStyles, Radio, RadioGroup, SimpleGrid, Textarea, TextInput } from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import React from 'react';
import { Form, FormSection } from './Form';
import { createFormStyles } from './styles';

const create = createFormStyles
const useFormStyles = createStyles(create)

export function AddRecipeForm() {
  const { classes } = useFormStyles()
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      img: null,
      weather: null,
      ingredients: formList([
        {
          name: '',
          uom: '',
          quantity: ''
        }
      ]),
      steps: formList([
        {
          sortkey: '',
          value: ''
        }
      ])
    }
  })


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
            <TextInput mt={'md'} label='Name' {...form.getInputProps('name')} required/>
            <Textarea mt={'md'} label='Description' {...form.getInputProps('description')} required/>
          </FormSection>
          <FormSection title="Image">
            <span>Image</span>

          </FormSection>
          <FormSection className={classes.full} title="Weather">
            <RadioGroup {...form.getInputProps('weather')}>
              <Radio label="Cold" value='cold'/>
              <Radio label="Warm" value='warm'/>
            </RadioGroup>
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

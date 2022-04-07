import { Box, Container, createStyles, CSSObject, Group, Radio, RadioGroup, SimpleGrid, Text, Textarea, TextInput } from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import React from 'react';
import { Form, FormSection } from './Form';
import { createFormStyles } from './styles';

const create = createFormStyles
const useFormStyles = createStyles(create)

const inputHeaderStyles: CSSObject = {
  display: 'flex', 
  flexBasis: 0
}

const IngredientInputHeader = () => {
  return (
    <Group sx={inputHeaderStyles} spacing={'xl'}>
      <Text>Quantity</Text>
      <Text>UOM</Text>
      <Text sx={{ flex: 1 }}>Quantity</Text>
    </Group>
  )
}

const StepInputHeader = () => {
  return (
    <Group sx={inputHeaderStyles} spacing={'xl'}>
      <Text>Key</Text>
      <Text sx={{ flex: 1 }}>Value</Text>
    </Group>
  )
}

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
            <IngredientInputHeader />
          </FormSection>
          <FormSection className={classes.full} title="Steps">
            <StepInputHeader />
          </FormSection>
        </SimpleGrid>
      </Container>
    </Form>
  );
}

import { Radio, Container, createStyles, CSSObject, RadioGroup, SimpleGrid, Text, Textarea, TextInput, MantineTheme, Group, Image, StepProps, useMantineTheme, ThemeIcon, Button } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { formList, useForm } from '@mantine/form';
import { FormList } from '@mantine/form/lib/form-list/form-list';
import { showNotification } from '@mantine/notifications';
import React, { ReactElement, useState } from 'react';
import { Icon as TablerIcon, Photo, Plus, Trash, Upload, X } from 'tabler-icons-react'
import { FileRejection, FullRecipeProps, IngredientProps } from '../../../lib/types';
import { getUUID } from '../../../lib/uuild';
import { IngredientInputHeader, StepInputHeader } from './AddRecipeForm';
import { Form, FormSection } from './Form';
import { createFormStyles } from './styles';

const create = createFormStyles
const useFormStyles = createStyles(create)

interface EditRecipeFormProps {
  recipe: FullRecipeProps
}

interface EditFormType {
  recipeid: string
  name: string
  description: string
  img?: string|null
  weather?: 'warm'|'cold'|''|null
  ingredients: FormList<IngredientProps>
  steps: FormList<StepProps>
}

const hiddenStyles: CSSObject = {
  height: 0,
  width: 0,
  margin: 0,
  padding: 0,
  opacity: 0,
  position: 'absolute'
}

export function EditRecipeForm({ recipe }: EditRecipeFormProps) {
  const { classes } = useFormStyles()
  const [previewURL, setPreviewURL] = useState<string|null>(recipe.img ? `/img/${recipe.img}` : null)
  const theme = useMantineTheme()
  const ingredientList = formList(recipe.ingredients)
  const stepList = formList(recipe.steps)
  const form = useForm({
    initialValues: {
      recipeid: recipe.recipeid,
      name: recipe.name,
      description: recipe.description,
      img: recipe.img,
      weather: recipe.weather,
      ingredients: ingredientList,
      steps: stepList
    }
  })

  
  const IngredientFields = (): ReactElement[] => {
    const mapIngredients = (_: any, i: number): ReactElement => {
      return (
        <Group my={'sm'} key={i}>
          <TextInput {...form.getListInputProps('ingredients', i, 'ingredientid')} sx={hiddenStyles}/>
          <TextInput 
            sx={{ flex: 0, minWidth: '3.85rem' }} 
            required 
            placeholder="1" 
            {...form.getListInputProps('ingredients', i, 'quantity')}/>
          <TextInput 
            sx={{ flex: 0, minWidth: '3.5rem' }} 
            required 
            placeholder="lb" 
            {...form.getListInputProps('ingredients', i, 'uom')}/>
          <TextInput 
            sx={{ flex: 1 }} 
            required 
            placeholder="bacon" 
            {...form.getListInputProps('ingredients', i, 'name')}/>
          {form.values.ingredients.length > 1 && 
            <ThemeIcon 
              sx={{ flex: 0 }} 
              variant='light' 
              color={'red'}
              onClick={() => form.removeListItem('ingredients', i)}>
                <Trash size={14}/>
            </ThemeIcon>
          }
        </Group>
      )
    }

    return form.values.ingredients.map(mapIngredients)
  }

  const StepFields = (): ReactElement[] => {
    const mapSteps = (_: any, i: number): ReactElement => {
      return (
        <Group my={'sm'} align="flex-start" key={i}>
          <TextInput {...form.getListInputProps('steps', i, 'stepid')} sx={hiddenStyles}/>
          <TextInput 
            sx={{ flex: 0, minWidth: '3.85rem' }} 
            required 
            placeholder="1" 
            {...form.getListInputProps('steps', i, 'sortkey')}/>
          <Textarea
            sx={{ flex: 1 }} 
            required 
            placeholder="Cook bacon..." 
            {...form.getListInputProps('steps', i, 'value')}/>
          {form.values.ingredients.length > 1 && 
            <ThemeIcon 
              sx={{ flex: 0 }} 
              variant='light' 
              color={'red'}
              onClick={() => form.removeListItem('steps', i)}>
                <Trash size={14}/>
            </ThemeIcon>
          }
        </Group>
      )
    }

    return form.values.steps.map(mapSteps)
  }

  function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
    return status.accepted
      ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
      : status.rejected
      ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[0]
      : theme.colors.gray[7];
  }
  
  function ImageUploadIcon({
    status,
    ...props
  }: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
    if (status.accepted) {
      return <Upload {...props} />;
    }
  
    if (status.rejected) {
      return <X {...props} />;
    }
  
    return <Photo {...props} />;
  }
  
  const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
    <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
      {previewURL && <Image height={'100%'} alt="Preview Image" src={previewURL}/>}
      {!previewURL && 
        <>
          <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />
          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </>
      }
    </Group>
  );
  
  function handleFileDropSuccess(files: File[]) {
    setPreviewURL(URL.createObjectURL(files[0]))
    showNotification({
      title: 'Add Recipe Form',
      message: 'Image successfully added',
      color: 'green'
    })
  }

  function handleFileDropFailure(files: FileRejection[]) {
    setPreviewURL(null)
    showNotification({
      title: 'Add Recipe Form',
      message: `Image not added. ${files[0].errors[0].message}`,
      color: 'red'
    })
  }
  

  function handleSubmit(formData: EditFormType) {
    if (formData.weather === '') formData.weather = null
    console.log(formData)
  }

  return (
    <Form onSubmit={form.onSubmit(handleSubmit)}>
      <Container>
          <SimpleGrid cols={1} breakpoints={[{minWidth: 600,cols: 2}]}>
            <FormSection title="General">
              <TextInput {...form.getInputProps('recipeid')} sx={hiddenStyles}/>
              <TextInput label="Name" {...form.getInputProps('name')} />
              <Textarea label="Description" {...form.getInputProps('description')}/>
            </FormSection>
            <FormSection title="Image">
            <Dropzone
                multiple={false}
                onDrop={handleFileDropSuccess}
                onReject={handleFileDropFailure}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}>
                  {(status: DropzoneStatus) => dropzoneChildren(status, theme)}
              </Dropzone>
            </FormSection>
            <FormSection className={classes.full} title="Weather">
              <RadioGroup {...form.getInputProps('weather')}>
                <Radio label="Cold" value='cold'/>
                <Radio label="Warm" value='warm'/>
                <Radio label="N/A" value={''}/>
              </RadioGroup>
            </FormSection>
            <FormSection className={classes.full} title="Ingredients">
              <IngredientInputHeader />
              {IngredientFields()}
              <Button 
              onClick={() => form.addListItem('ingredients', { ingredientid: getUUID(), name: '', uom: '', quantity: '', recipeid: recipe.recipeid})} 
              my={'lg'} 
              variant='light' 
              color={'gray'} 
              leftIcon={<Plus />}>Add Ingredient</Button>
            </FormSection>
            <FormSection className={classes.full} title="Steps">
              <StepInputHeader />
              {StepFields()}
              <Button 
              onClick={() => form.addListItem('steps', { stepid: getUUID(), sortkey: '', value: '', recipeid: recipe.recipeid})} 
              my={'lg'} 
              variant='light' 
              color={'gray'} 
              leftIcon={<Plus />}>Add Step</Button>
            </FormSection>
          </SimpleGrid>
        </Container>
    </Form>
  );
}

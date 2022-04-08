import { Box, Button, Container, createStyles, CSSObject, Group, Image, MantineTheme, Radio, RadioGroup, SimpleGrid, Text, Textarea, TextInput, ThemeIcon, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { formList, useForm } from '@mantine/form';
import { FormList } from '@mantine/form/lib/form-list/form-list';
import { showNotification } from '@mantine/notifications';
import React, { ReactElement, useState } from 'react';
import { Plus, Trash, Icon as TablerIcon, Upload, X, Photo } from 'tabler-icons-react';
import { FileRejection, IngredientParams, StepParams } from '../../../lib/types';
import { Form, FormSection } from './Form';
import { createFormStyles } from './styles';

interface AddFormType {
  name: string
  description: string
  img?: string|null
  weather?: 'warm'|'cold'|''|null
  ingredients: FormList<IngredientParams>
  steps: FormList<StepParams>
}

const create = createFormStyles
const useFormStyles = createStyles(create)

const inputHeaderStyles: CSSObject = {
  display: 'flex', 
  flexBasis: 0
}

export const IngredientInputHeader = () => {
  return (
    <Group sx={inputHeaderStyles} mb={'xs'} spacing={'xl'}>
      <Text sx={{ minWidth: '3.85rem' }}>Quantity</Text>
      <Text sx={{ minWidth: '2.6rem' }}>UOM</Text>
      <Text sx={{ flex: 1 }}>Quantity</Text>
    </Group>
  )
}

export const StepInputHeader = () => {
  return (
    <Group sx={inputHeaderStyles} spacing={'xl'}>
      <Text>Key</Text>
      <Text sx={{ flex: 1 }}>Value</Text>
    </Group>
  )
}

export function AddRecipeForm() {
  const [previewURL, setPreviewURL] = useState<string|null>(null)
  const { classes } = useFormStyles()
  const theme = useMantineTheme()
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

  const IngredientFields = (): ReactElement[] => {
    const mapIngredients = (_: any, i: number): ReactElement => {
      return (
        <Group my={'sm'} key={i}>
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
  

  function handleSubmit(formData: AddFormType) {
    if (formData.weather === '') formData.weather = null
    console.log(formData)
  }

  return (
    <Form onSubmit={form.onSubmit(handleSubmit)}>
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
              onClick={() => form.addListItem('ingredients', {name: '', uom: '', quantity: ''})} 
              my={'lg'} 
              variant='light' 
              color={'gray'} 
              leftIcon={<Plus />}>Add Ingredient</Button>
          </FormSection>
          <FormSection className={classes.full} title="Steps">
            <StepInputHeader />
            {StepFields()}
            <Button 
              onClick={() => form.addListItem('steps', { sortkey: '', value: '' })} 
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

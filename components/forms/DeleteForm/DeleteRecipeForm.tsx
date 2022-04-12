import { Box, Button, createStyles, MantineTheme, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Trash } from 'tabler-icons-react';

export interface DeleteRecipeFormProps {
  recipeid: string
  recipeName: string
}

function createDeleteFormStyles(t: MantineTheme) {
  return ({
    form: {
      border: '1px solid',
      borderColor: t.colorScheme === 'dark' ? t.colors.red[4] : t.colors.red[6],
      borderRadius: t.radius.sm
    },
    formText: {
      color: t.colorScheme === 'dark' ? t.colors.red[4] : t.colors.red[6]
    }
  })
}

const useDeleteFormStyles = createStyles(createDeleteFormStyles)

export function DeleteRecipeForm({ recipeid, recipeName }: DeleteRecipeFormProps) {
  const { classes } = useDeleteFormStyles()
  const [error, setError] = useState<string|null>(null)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const form = useForm({
    initialValues: {
      name: ''
    },
    validate: {
      name: (value: string) => value === recipeName ? null : 'Invalid value'
    }
  })

  const handleSubmit = async (form: { name: string }) => {
    const response = await axios.delete(`/api/recipe/${recipeid}`)
    if (response.status >= 400) {
      setError(response.data)
      showNotification({
        title: "Form Event",
        message: `Response returned a ${response.status}`
      })
    } else {
      window.location.href = '/'
      setError(null)
    }
  }

  useEffect(() => {
    if (form.values.name.length) {
      if (form.values.name !== recipeName) {
        setButtonDisabled(true)
      } else {
        setButtonDisabled(false)
      }
    }
  }, [ form, recipeName ])

  return (
    <Box 
      mx={'xs'} 
      my={48} 
      p={'xl'} 
      component='form' 
      className={classes.form}
      onSubmit={form.onSubmit(handleSubmit)}>
      <Box>
        <Text className={classes.formText}>Delete Recipe</Text>
        {error && <>{error}</>}
      </Box>
      <Box py={24}>
        <TextInput 
          placeholder={recipeName} 
          {...form.getInputProps('name')}/>
        <Button type="submit" disabled={buttonDisabled} my={'xl'} color={'red'} rightIcon={<Trash />}>DELETE</Button>
      </Box>
    </Box>
  );
}

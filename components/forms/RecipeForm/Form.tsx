import { Box, BoxProps, Button, Group, Title } from '@mantine/core';
import React from 'react';
import { DeviceFloppy, Icon, Refresh } from 'tabler-icons-react';

interface CustomButton {
  submitText: string
  leftIcon: Icon
}

interface NormalButton {
  submitText?: undefined
  leftIcon?: undefined
}

export type FormProps = BoxProps<'form'> & (NormalButton|CustomButton)

export interface FormSectionProps extends BoxProps<'div'> {
  title: string
}

export function FormSection({title, children }: FormSectionProps) {
  return (
    <Box sx={{border: '1px solid'}}>
      <Title order={2}>{title}</Title>
      {children}
    </Box>
  )
}

export function Form({ children, submitText, leftIcon }: FormProps) {
  return (
    <Box component='form'>
      {children}
      <Group>
        <Button 
          variant='gradient'
          gradient={{
            from: 'orange',
            to: 'red',
            deg: -25
          }}
          leftIcon={leftIcon || <DeviceFloppy />} 
          type="submit">{submitText || 'Save'}</Button>
        <Button 
          color={'gray'}
          leftIcon={<Refresh />} 
          type="reset">{'Reset'}</Button>
      </Group>
    </Box>
  );
}

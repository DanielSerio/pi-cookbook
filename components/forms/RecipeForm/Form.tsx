import { Box, BoxProps, Button, Container, Group, Text, Title } from '@mantine/core';
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

export function FormSection({title, children, ...props }: FormSectionProps) {
  return (
    <Box {...props}>
      <Title order={2} my={'xs'}>
        <Text size={'xl'} color={'dimmed'}>{title}</Text>
      </Title>
      {children}
    </Box>
  )
}

export function Form({ children, submitText, leftIcon, ...props }: FormProps) {

  return (
    <Box component='form' {...props}>
      {children}
      <Container>
        <Group my={'xl'}>
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
      </Container>
    </Box>
  );
}

import { Box, BoxProps, Container, ContainerProps, createStyles, CSSObject, Footer, MantineTheme, Text } from '@mantine/core';
import React from 'react';

function createFooterStyles(t: MantineTheme): Record<string, CSSObject> {
  return ({
    footer: {
      color: t.colorScheme === 'light' ? t.colors.dark : t.colors.gray[0],
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }
  })
}

const useFooterStyles = createStyles(createFooterStyles)

interface FooterProps extends ContainerProps {
  center?: true
}

function FooterBlock({ children, center, ...props }: FooterProps) {
  return (
    <Box m={0} p={0}>
      <Container sx={{ textAlign: center ? 'center' : 'left' }} {...props}>
        {children}
      </Container>
    </Box>
  )
}

export function AppFooter() {
  const { classes } = useFooterStyles()
  return (
    <Footer height={300} className={classes.footer}>
      <FooterBlock center>
        <Text 
          sx={{width: '100%' }} 
          color={'dimmed'} 
          component={'small'}>Created by Dan Serio</Text>
      </FooterBlock>
    </Footer>
  )
}

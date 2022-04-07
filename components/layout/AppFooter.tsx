import { Box, createStyles, CSSObject, Footer, MantineTheme, Text } from '@mantine/core';
import React from 'react';

function createFooterStyles(t: MantineTheme): Record<string, CSSObject> {
  return ({
    footer: {
      color: t.colorScheme === 'light' ? t.colors.dark : t.colors.gray[0]
    }
  })
}

const useFooterStyles = createStyles(createFooterStyles)

export function AppFooter() {
  const { classes } = useFooterStyles()
  return (
    <Footer height={300} className={classes.footer}>
      <Text color={'inherit'}>Footer</Text>
    </Footer>
  )
}

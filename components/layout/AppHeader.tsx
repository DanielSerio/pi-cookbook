import { Box, createStyles, CSSObject, Group, Header, Text } from '@mantine/core';
import React from 'react';
import { HeaderMenu } from '../navigation';

function createHeaderStyles(): Record<string, CSSObject> {
  return ({
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      padding: '0 3.22ch'
    }
  })
}

const useHeaderStyles = createStyles(createHeaderStyles)

export function AppHeader() {
  const { classes } = useHeaderStyles()
  return (
    <Box component='header'>
      <Header height={72}>
        <Group className={classes.headerContainer}>
          <Box>
            <Text 
              variant='gradient' 
              gradient={{ from: 'yellow', to: 'orange', deg: -100 }}
              weight={700}
              size={'xl'}>My Cookbook</Text>
          </Box>
          <Box>
            <HeaderMenu />
          </Box>
        </Group>
      </Header>
    </Box>
  );
}

import { Box, Group, Header } from '@mantine/core';
import React from 'react';

export function AppHeader() {
  return (
    <Box component='header'>
      <Header height={72}>
        <Group>
          <Box>Logo</Box>
          <Box>Nav</Box>
        </Group>
      </Header>
    </Box>
  );
}

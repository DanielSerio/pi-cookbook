import { Box, Footer, Text } from '@mantine/core';
import React from 'react';

export default function AppFooter() {
  return (
    <Box component='footer'>
      <Footer height={300}>
        <Text>Footer</Text>
      </Footer>
    </Box>
  );
}

import { Text, Title } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import { AddRecipeForm } from '../components/forms';

import { Page } from '../components/layout';

export default function AddRecipe() {
  return (
    <Page title="Cookbook | Add Recipe" description="Add Recipe">
      <Title px={'xl'} sx={{maxWidth: 980 }} mx={'auto'} order={1}>
        <Text size={'xl'} color={'grey'} component={'span'}>Add Recipe</Text>
      </Title>
      <NotificationsProvider>
        <AddRecipeForm />
      </NotificationsProvider>
    </Page>
  );
}

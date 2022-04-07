import { Burger, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NextLink } from '@mantine/next'
import React from 'react';
import { Home, Plus } from 'tabler-icons-react';

export function HeaderMenu() {
  const [opened, handlers] = useDisclosure(false)

  return (
    <Menu 
      opened={opened} 
      control={<Burger opened={opened} />}
      onOpen={handlers.open}
      onClose={handlers.close}>
        <Menu.Label>Main Menu</Menu.Label>
        <Menu.Item icon={<Home size={10}/>} component={NextLink} href="/">Home</Menu.Item>
        <Menu.Item icon={<Plus size={10}/>} component={NextLink} href="/add-recipe">Add Recipe</Menu.Item>
      </Menu>
  );
}

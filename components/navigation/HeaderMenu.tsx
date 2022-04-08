import { Burger, Divider, Menu, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NextLink } from '@mantine/next'
import React from 'react';
import { Home, Moon, Palette, Plus, Sun } from 'tabler-icons-react';

export function HeaderMenu() {
  const [opened, handlers] = useDisclosure(false)
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  return (
    <Menu 
      opened={opened} 
      control={<Burger opened={opened} />}
      onOpen={handlers.open}
      onClose={handlers.close}>
        <Menu.Label>Main Menu</Menu.Label>
        <Menu.Item icon={<Home size={12}/>} component={NextLink} href="/">Home</Menu.Item>
        <Menu.Item icon={<Plus size={12}/>} component={NextLink} href="/add-recipe">Add Recipe</Menu.Item>
        <Divider />
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item 
          icon={colorScheme === 'light' ? <Moon size={12}/> : <Sun size={12}/>} 
          component='button' 
          onClick={() => toggleColorScheme()}>
            {colorScheme === 'light' ? 'Darkmode' : 'Lightmode' }
          </Menu.Item>
      </Menu>
  );
}

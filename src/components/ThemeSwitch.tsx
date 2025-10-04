'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button, Menu, Portal } from '@chakra-ui/react'

export function ThemeSwitch() {
  const { setTheme } = useTheme()

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" aria-label="Toggle theme">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item onClick={() => setTheme('light')} value="light-theme-a">
              Light
            </Menu.Item>
            <Menu.Item onClick={() => setTheme('dark')} value="dark-theme-a">
              Dark
            </Menu.Item>
            <Menu.Item
              onClick={() => setTheme('system')}
              value="system-theme-a"
            >
              System
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

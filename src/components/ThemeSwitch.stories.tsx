import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ThemeSwitch } from './ThemeSwitch';

const meta = {
  component: ThemeSwitch,
} satisfies Meta<typeof ThemeSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
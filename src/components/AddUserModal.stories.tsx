import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AddUserModal } from './AddUserModal';

const meta = {
  component: AddUserModal
} satisfies Meta<typeof AddUserModal>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    onSubmit: async () => {},
    isLoading: false,
  },
};
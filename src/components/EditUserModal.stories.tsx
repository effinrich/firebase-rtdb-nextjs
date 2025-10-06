import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { EditUserModal } from './EditUserModal'
import type { UserFormData } from '@/types/user'

const meta = {
  component: EditUserModal
} satisfies Meta<typeof EditUserModal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: async (id: string, data: UserFormData, currentZipCode: string) =>
      Promise.resolve(),
    user: {
      id: '1',
      name: 'John Doe',
      zipCode: '12345',
      latitude: 40.7128,
      longitude: -74.006,
      timezone: -18000
    }
  }
}

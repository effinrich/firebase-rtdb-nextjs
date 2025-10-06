import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { UserTable } from './UserTable'

const meta = {
  component: UserTable
} satisfies Meta<typeof UserTable>

export default meta

type Story = StoryObj<typeof meta>

const mockUsers = [
  {
    id: '-OaYjNay1N0u2LakFfUF',
    latitude: 36.3445,
    longitude: -82.2015,
    name: 'Rich lee Tillman',
    timezone: -14400,
    zipCode: '37643'
  },
  {
    id: '-Oai157cT-O7hQaB8Tf3',
    latitude: 36.3445,
    longitude: -82.2015,
    name: 'Jan Tillman',
    timezone: -14400,
    zipCode: '37643'
  },
  {
    id: '-Oan5SwJEjJVSwZgeWE0',
    latitude: 40.5823,
    longitude: -74.2313,
    name: 'Fred Krueger',
    timezone: -14400,
    zipCode: '07008'
  },
  {
    id: '-OapsGYgttmI_b7bL8E2',
    latitude: 34.4336,
    longitude: -118.5007,
    name: 'Ted Turner',
    timezone: -25200,
    zipCode: '91350'
  }
]

export const Default: Story = {
  args: {
    users: mockUsers,
    onEdit: () => {},
    onDelete: () => {}
  }
}

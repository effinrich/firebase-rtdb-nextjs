import { Table } from '@chakra-ui/react'
import { Button, Box, Text, Center } from '@chakra-ui/react'

import { User } from '@/types/user'
import { Edit, Trash2 } from 'lucide-react'

interface UserTableProps {
  users: Array<User>
  onEdit: (user: User) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export function UserTable({
  users,
  onEdit,
  onDelete,
  isLoading
}: UserTableProps) {
  if (isLoading) {
    return (
      <Center py={12}>
        <Text fontSize="lg" color="gray.500">
          Loading users...
        </Text>
      </Center>
    )
  }

  if (users.length === 0) {
    return (
      <Center
        py={12}
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="lg"
      >
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="medium" color="gray.900">
            No users yet
          </Text>
          <Text fontSize="sm" color="gray.500" mt={1}>
            Get started by adding your first user
          </Text>
        </Box>
      </Center>
    )
  }

  return (
    <Table.ScrollArea
      borderRadius="lg"
      border="1px"
      borderColor="gray.200"
      shadow="sm"
    >
      <Table.Root variant="line">
        <Table.Header bg="gray.50">
          <Table.Row>
            <Table.ColumnHeader fontWeight="semibold">Name</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="semibold">
              Zip Code
            </Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="semibold" textAlign="right">
              Latitude
            </Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="semibold" textAlign="right">
              Longitude
            </Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="semibold" textAlign="right">
              Timezone (UTC)
            </Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="semibold" textAlign="right">
              Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id} _hover={{ bg: 'gray.50' }}>
              <Table.Cell fontWeight="medium">{user.name}</Table.Cell>
              <Table.Cell>{user.zipCode}</Table.Cell>
              <Table.Cell textAlign="right">
                {user.latitude?.toFixed(2)}
              </Table.Cell>
              <Table.Cell textAlign="right">
                {user.longitude?.toFixed(2)}
              </Table.Cell>
              <Table.Cell textAlign="right">{`UTC${user.timezone/ 3600 >= 0 ? '+' : ''}${user.timezone/ 3600}`}</Table.Cell>
              <Table.Cell>
                <Box display="flex" gap={2} justifyContent="flex-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => onEdit(user)}
                    aria-label="Edit user"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => onDelete(user.id)}
                    aria-label="Delete user"
                  >
                    <Trash2 size={16} />
                  </Button>
                </Box>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}

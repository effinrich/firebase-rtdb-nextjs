
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Container, Heading, Button, Box, Flex, Text } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { UserTable } from "@/components/UserTable";
import { AddUserModal } from "@/components/AddUserModal";
import { EditUserModal } from "@/components/EditUserModal";
import { Toaster, toaster } from '@/components/ui/toaster';
import { fetchUsers, createUser, updateUser, deleteUser } from "@/services/userService";
import { User, UserFormData } from "@/types/user";

export default function HomePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    toaster.create({
        title: "User added successfully",
        type: "success",
        duration: 3000,
      });
    },
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Called when an error occurs while adding a user.
 * @param {Error} error - The error that occurred.
 */
/*******  f9eb70e2-639d-4743-85f7-a3d7935c22c0  *******/
    onError: (error: Error) => {
    toaster.create({
        title: "Failed to add user",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData, currentZipCode }: { 
      id: string; 
      formData: UserFormData; 
      currentZipCode: string;
    }) => updateUser(id, formData, currentZipCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toaster.create({
        title: "User updated successfully",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Failed to update user",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toaster.create({
        title: "User deleted successfully",
        type: "success",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Failed to delete user",
        description: error.message,
        type: "error",
        duration: 5000,
      });
    },
  });

  const handleAddUser = async (formData: UserFormData) => {
    await createMutation.mutateAsync(formData);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (id: string, formData: UserFormData, currentZipCode: string) => {
    await updateMutation.mutateAsync({ id, formData, currentZipCode });
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={2}>
          <Heading as="h1" size="xl" fontWeight="bold">
            User Dashboard
          </Heading>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => setIsAddModalOpen(true)}>
            <Plus />
            Add User
          </Button>
        </Flex>
        <Text color="gray.600" fontSize="lg">
          Manage users with automatic location data from zip codes
        </Text>
      </Box>

      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        isLoading={isLoading}
      />

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
        isLoading={createMutation.isPending}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUser(null)
        }}
        onSubmit={handleUpdateUser}
        user={selectedUser}
        isLoading={updateMutation.isPending}
      />
      <Toaster />
    </Container>
  )
}

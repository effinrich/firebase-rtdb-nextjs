import { useState, useEffect } from 'react'
import { Input, Button, Field, Dialog, Portal } from '@chakra-ui/react'

import { User, UserFormData } from '@/types/user'

interface EditUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (
    id: string,
    data: UserFormData,
    currentZipCode: string
  ) => Promise<void>
  user: User | null
  isLoading?: boolean
}

export function EditUserModal({
  isOpen,
  onClose,
  onSubmit,
  user,
  isLoading
}: EditUserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    zipCode: ''
  })
  const [errors, setErrors] = useState<Partial<UserFormData>>({})

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        zipCode: user.zipCode
      })
    }
  }, [user])

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required'
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid zip code format'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !user) {
      return
    }

    try {
      await onSubmit(user.id, formData, user.zipCode)
      setErrors({})
      onClose()
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  const handleClose = () => {
    setErrors({})
    onClose()
  }

  const zipCodeChanged = user && formData.zipCode !== user.zipCode

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={handleClose}
      size="md"
      placement={'top'}
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit User</Dialog.Title>
              <Dialog.CloseTrigger />
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit}>
                <Field.Root invalid={!!errors.name} mb={4}>
                  <Field.Label>Name</Field.Label>
                  <Input
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter user name"
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <Field.ErrorText>{errors.name}</Field.ErrorText>
                  )}
                </Field.Root>

                <Field.Root invalid={!!errors.zipCode}>
                  <Field.Label>Zip Code</Field.Label>
                  <Input
                    value={formData.zipCode}
                    onChange={e =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                    placeholder="Enter zip code (e.g., 10001)"
                    disabled={isLoading}
                  />
                  {errors.zipCode && (
                    <Field.ErrorText>{errors.zipCode}</Field.ErrorText>
                  )}
                  {zipCodeChanged && (
                    <Field.HelperText color="blue.600">
                      Location data will be updated automatically
                    </Field.HelperText>
                  )}
                </Field.Root>
              </form>
            </Dialog.Body>

            <Dialog.Footer>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
                ml={2}
              >
                Update User
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

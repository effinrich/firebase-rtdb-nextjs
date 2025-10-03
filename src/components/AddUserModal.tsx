
import { useState } from "react";
import { DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogBackdrop, DialogCloseTrigger } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { UserFormData } from "@/types/user";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => Promise<void>;
  isLoading?: boolean;
}

export function AddUserModal({ isOpen, onClose, onSubmit, isLoading }: AddUserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid zip code format";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit(formData);
      setFormData({ name: "", zipCode: "" });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", zipCode: "" });
    setErrors({});
    onClose();
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={handleClose} size="md">
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <Field.Root invalid={!!errors.name} mb={4}>
              <Field.Label>Name</Field.Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter user name"
                disabled={isLoading}
              />
              {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
            </Field.Root>

            <Field.Root invalid={!!errors.zipCode}>
              <Field.Label>Zip Code</Field.Label>
              <Input
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                placeholder="Enter zip code (e.g., 10001)"
                disabled={isLoading}
              />
              {errors.zipCode && <Field.ErrorText>{errors.zipCode}</Field.ErrorText>}
              <Field.HelperText>
                Location data will be fetched automatically
              </Field.HelperText>
            </Field.Root>
          </form>
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            ml={3}
          >
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

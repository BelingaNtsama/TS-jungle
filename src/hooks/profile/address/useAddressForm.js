import { useState, useCallback } from 'react';
import { validateAddressForm } from '@utils/validations'; // Adjust the import path as necessary

const DEFAULT_ADDRESS = {
  name: "",
  street: "",
  postalCode: "",
  city: "",
  country: "France",
};

export function useAddressForm(initialData = DEFAULT_ADDRESS) {
  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});

  const resetForm = useCallback(() => {
    setFormData(DEFAULT_ADDRESS);
    setFormErrors({});
  }, []);

  const setAddressData = useCallback((address) => {
    setFormData(address || DEFAULT_ADDRESS);
    setFormErrors({});
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [formErrors]);

  const validateForm = useCallback(() => {
    const validation = validateAddressForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
    }
    return validation.isValid;
  }, [formData]);

  return {
    formData,
    formErrors,
    resetForm,
    setAddressData,
    handleInputChange,
    validateForm
  };
}

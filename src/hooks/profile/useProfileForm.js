import { useState } from 'react'

export const useProfileForm = (initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Bio validation
    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must not exceed 500 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (onSubmit) => {
    if (validateForm()) {
      setIsLoading(true)
      try {
        await onSubmit(formData)
      } catch (error) {
        console.error('Form submission error:', error)
        setErrors(prev => ({
          ...prev,
          submit: 'An error occurred while submitting the form'
        }))
      } finally {
        setIsLoading(false)
      }
    }
  }

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    validateForm
  }
}

export default useProfileForm

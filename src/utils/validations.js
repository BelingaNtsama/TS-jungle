export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
  return phoneRegex.test(phone)
}

export const validatePostalCode = (postalCode) => {
  const postalCodeRegex = /^[0-9]{5}$/
  return postalCodeRegex.test(postalCode)
}

export const validateCardNumber = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s/g, "")
  return cleanNumber.length >= 13 && cleanNumber.length <= 19 && /^\d+$/.test(cleanNumber)
}

export const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv)
}

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0
}

export const validateForm = (data, rules) => {
  const errors = {}

  Object.keys(rules).forEach((field) => {
    const value = data[field]
    const fieldRules = rules[field]

    fieldRules.forEach((rule) => {
      if (rule.required && !validateRequired(value)) {
        errors[field] = rule.message || `${field} est requis`
        return
      }

      if (value && rule.validator && !rule.validator(value)) {
        errors[field] = rule.message || `${field} n'est pas valide`
      }
    })
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}


// src/utils/validations.js
export function validateAddressForm(data) {
  const rules = {
    name: [{ required: true, message: "Le nom de l'adresse est requis" }],
    street: [{ required: true, message: "L'adresse est requise" }],
    postalCode: [{ required: true, message: "Le code postal est requis" }],
    city: [{ required: true, message: "La ville est requise" }],
    country: [{ required: true, message: "Le pays est requis" }],
  }

  const errors = {}
  let isValid = true

  Object.keys(rules).forEach((field) => {
    for (const rule of rules[field]) {
      if (rule.required && !data[field]) {
        errors[field] = rule.message
        isValid = false
        break
      }
    }
  })

  return { isValid, errors }
}
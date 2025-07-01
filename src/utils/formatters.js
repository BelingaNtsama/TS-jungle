// src/utils/formatters.js
import { ORDER_STATUS } from "@utils/constants"


export function getStatusBadge(status) {
  const statusConfig = {
    [ORDER_STATUS.DELIVERED]: "badge-success",
    [ORDER_STATUS.IN_PROGRESS]: "badge-info",
    [ORDER_STATUS.PREPARING]: "badge-warning",
  }
  return `badge ${statusConfig[status] || "badge-neutral"}`
}

export const formatPrice = (price) => {
  if (typeof price === "string") {
    return `${price} €`
  }
  return `${price.toFixed(2)} €`
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export const formatCardNumber = (cardNumber) => {
  return cardNumber.replace(/(.{4})/g, "$1 ").trim()
}

export const maskCardNumber = (cardNumber) => {
  const last4 = cardNumber.slice(-4)
  return `**** **** **** ${last4}`
}

export const formatPhoneNumber = (phone) => {
  return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
}

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

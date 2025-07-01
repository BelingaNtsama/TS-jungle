// src/hooks/usePaymentActions.js
import { useCallback } from "react"
import { usePaymentMethods } from "@hooks/profile/payment/useMethods"
import { toast } from "sonner"

export function usePaymentActions() {
  const { addPaymentMethod, deletePaymentMethod, setDefaultPaymentMethod } = usePaymentMethods()

  const handleSetDefault = useCallback(
    async (id) => {
      try {
        await setDefaultPaymentMethod(id)
       toast.success("Moyen de paiement par défaut mis à jour avec succès")
      } catch (error) {
        toast.error(`Erreur lors de la mise à jour du moyen de paiement par défaut : ${error.message}`)
      }
    },
    [setDefaultPaymentMethod],
  )

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deletePaymentMethod(id)
        toast.success("Moyen de paiement supprimé avec succès")
      } catch (error) {
        toast.error(`Erreur lors de la suppression du moyen de paiement : ${error.message}`)
      }
    },
    [deletePaymentMethod],
  )

  const handleAddPaymentMethod = useCallback(
    async (data) => {
      try {
        await addPaymentMethod(data)
       toast.success("Moyen de paiement ajouté avec succès")
      } catch (error) {
        toast.error(`Erreur lors de l'ajout du moyen de paiement : ${error.message}`)
      }
    },
    [addPaymentMethod],
  )

  return {
    handleSetDefault,
    handleDelete,
    handleAddPaymentMethod,
  }
}
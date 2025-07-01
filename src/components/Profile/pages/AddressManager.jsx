// src/pages/AddressManager.jsx
import { useState } from "react"
import SkeletonLoader from "@components/shared/SkeletonLoader"
import useAddresses from "@hooks/profile/address/useAddresses"
import CardLayout from "@layouts/CardLayout"
import AddressList from "@components/Profile/address/AddressList"
import AddressButton from "@components/Profile/address/AdressButton"
import AddressModal from "@components/Profile/address/AddressModal"
import { useAddressForm } from "@hooks/Profile/address/useAddressForm"
import { toast } from "sonner"

export default function AddressManager() {
  const { addresses, isLoading, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAddresses()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  const { formData, resetForm,  validateAddressForm } = useAddressForm()

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id)
      toast.success("Adresse par défaut mise à jour avec succès")
    } catch (error) {
      toast.error(`Erreur lors de la mise à jour de l'adresse par défaut : ${error.message}`)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id)
      toast.success("Adresse supprimée avec succès")
    } catch (error) {
      toast.error(`Erreur lors de la suppression de l'adresse : ${error.message}`)
    }
  }

  const handleEdit = (address) => {
    setEditingAddress(address)
    resetForm(address)
    setIsEditModalOpen(true)
  }

  const handleAddNew = () => {
    resetForm()
    setIsAddModalOpen(true)
  }

  const handleSubmitAdd = async (data) => {
    const validation = validateAddressForm(data)
    if (!validation.isValid) {
      // Gérer les erreurs via react-hook-form
      return
    }
    try {
      await addAddress(data)
      setIsAddModalOpen(false)
      resetForm()
     toast.success("Adresse ajoutée avec succès") 
    } catch (error) {
      toast.error(`Erreur lors de l'ajout de l'adresse : ${error.message}`)
      // Optionnel : réinitialiser le formulaire en cas d'erreur
      resetForm()
    }
  }

  const handleSubmitEdit = async (data) => {
    const validation = validateAddressForm(data)
    if (!validation.isValid) return
    try {
      await updateAddress(editingAddress.id, data)
      setIsEditModalOpen(false)
      setEditingAddress(null)
      toast.success("Adresse modifiée avec succès")
      resetForm()
    } catch (error) {
      toast.error(`Erreur lors de la modification de l'adresse : ${error.message}`)
      // Optionnel : réinitialiser le formulaire en cas d'erreur
      resetForm()
    }
  }

  if (isLoading) return <SkeletonLoader type="card" count={2} />

  return (
    <>
      <CardLayout title="Adresses de livraison" description="Gérez vos adresses de livraison">
        <AddressList
          addresses={addresses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
        />
        <AddressButton onClick={handleAddNew} />
      </CardLayout>

      <AddressModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSubmitAdd}
        title="Ajouter une nouvelle adresse"
        submitLabel="Ajouter l'adresse"
        defaultValues={formData}
      />

      <AddressModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmitEdit}
        title="Modifier l'adresse"
        submitLabel="Enregistrer les modifications"
        defaultValues={formData}
      />
    </>
  )
}
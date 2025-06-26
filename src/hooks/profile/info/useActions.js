// src/hooks/useProfileActions.js
import { useCallback } from "react"
import AppStore  from "@/mockStore/appStore"
import useProfile from "@/hooks/profile/useProfile"

export default function useActions() {
  const { updateUserData, updateProfileImage } = useProfile()
  const { addNotification } = AppStore()

  const handleUpdateProfile = useCallback(
    async (formData) => {
      try {
        await updateUserData(formData)
        addNotification({
          type: "success",
          title: "Profil mis à jour",
          message: "Vos informations ont été mises à jour avec succès",
        })
      } catch (error) {
        addNotification({
          type: "error",
          title: "Erreur",
          message: "Impossible de mettre à jour le profil",
        })
      }
    },
    [updateUserData, addNotification],
  )

  const handleUploadProfileImage = useCallback(
    async (croppedImage) => {
      try {
        await updateProfileImage(croppedImage)
        addNotification({
          type: "success",
          title: "Photo mise à jour",
          message: "Votre photo de profil a été mise à jour avec succès",
        })
      } catch (error) {
        addNotification({
          type: "error",
          title: "Erreur",
          message: "Impossible de mettre à jour la photo de profil",
        })
      }
    },
    [updateProfileImage, addNotification],
  )

  const handleChangePassword = useCallback(() => {
    addNotification({
      type: "success",
      title: "Mot de passe modifié",
      message: "Votre mot de passe a été modifié avec succès",
    })
  }, [addNotification])

  const handleEnable2FA = useCallback(() => {
    addNotification({
      type: "success",
      title: "2FA activée",
      message: "L'authentification à deux facteurs a été activée",
    })
  }, [addNotification])

  return {
    handleUpdateProfile,
    handleUploadProfileImage,
    handleChangePassword,
    handleEnable2FA,
  }
}
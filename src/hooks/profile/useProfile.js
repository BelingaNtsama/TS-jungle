import { useEffect } from "react"
import useUserStore from "@/mockStore/userStore"

export const useProfile = () => {
  const { userData, isLoading, error, loadUserData, updateUserData, updateProfileImage, reset } = useUserStore()

  useEffect(() => {
    if (!userData && !isLoading) {
      loadUserData()
    }
  }, [userData, isLoading, loadUserData])

  return {
    userData,
    isLoading,
    error,
    updateUserData,
    updateProfileImage,
    reset,
    refetch: loadUserData,
  }
}

export default useProfile

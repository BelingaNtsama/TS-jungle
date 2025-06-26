import { useEffect } from "react"
import useAddressesStore from "@/stores/adressesStore"

export const useAddresses = () => {
  const {
    addresses,
    isLoading,
    error,
    loadAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    reset,
  } = useAddressesStore()

  useEffect(() => {
    if (addresses.length === 0 && !isLoading) {
      loadAddresses()
    }
  }, [addresses.length, isLoading, loadAddresses])

  return {
    addresses,
    isLoading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    reset,
    refetch: loadAddresses,
  }
}

export default useAddresses

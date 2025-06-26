import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../services/axiosInstance";

const useAddressesStore = create(
  devtools(
    (set, get) => ({
      // État initial
      addresses: [],
      isLoading: false,
      error: null,
      hasLoaded: false,

      // Récupère l'ID utilisateur depuis le localStorage
      getUserId: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.id || null;
      },

      // Actions
      setAddresses: (addresses) => set({ addresses }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // CRUD Operations
      loadAddresses: async () => {
        if (get().hasLoaded) return;
        
        const userId = get().getUserId();
        if (!userId) {
          set({ error: "Utilisateur non authentifié" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const { data } = await axiosInstance.get(`/addresses/${userId}`);
          set({ 
            addresses: data, 
            isLoading: false,
            hasLoaded: true
          });
        } catch (error) {
          set({ 
            error: error.response?.data?.message || "Erreur lors du chargement des adresses",
            isLoading: false 
          });
        }
      },

      createAddress: async (addressData) => {
        const userId = get().getUserId();
        if (!userId) {
          set({ error: "Utilisateur non authentifié" });
          throw new Error("Utilisateur non authentifié");
        }

        set({ isLoading: true, error: null });
        try {
          const { data } = await axiosInstance.post(`/addresses/${userId}`, {
            ...addressData,
            user_id: userId
          });
          set(state => ({ 
            addresses: [...state.addresses, data],
            isLoading: false 
          }));
          return data;
        } catch (error) {
          set({ 
            error: error.response?.data?.message || "Erreur lors de la création de l'adresse",
            isLoading: false 
          });
          throw error;
        }
      },

      updateAddress: async (id, addressData) => {
        const userId = get().getUserId();
        if (!userId) {
          set({ error: "Utilisateur non authentifié" });
          throw new Error("Utilisateur non authentifié");
        }

        set({ isLoading: true, error: null });
        try {
          const { data } = await axiosInstance.put(`/addresses/${userId}`, addressData);
          set(state => ({
            addresses: state.addresses.map(addr => 
              addr.id === id ? data : addr
            ),
            isLoading: false 
          }));
          return data;
        } catch (error) {
          set({ 
            error: error.response?.data?.message || "Erreur lors de la mise à jour",
            isLoading: false 
          });
          throw error;
        }
      },

      deleteAddress: async (id) => {
        const userId = get().getUserId();
        if (!userId) {
          set({ error: "Utilisateur non authentifié" });
          throw new Error("Utilisateur non authentifié");
        }

        // Vérification adresse par défaut
        const addresses = get().addresses;
        const addressToDelete = addresses.find(addr => addr.id === id);

        if (addressToDelete?.is_default && addresses.length > 1) {
          set({ 
            error: "Impossible de supprimer l'adresse par défaut"
          });
          throw new Error(get().error);
        }

        try {
          await axiosInstance.delete(`/addresses/${userId}`);
          set(state => ({ 
            addresses: state.addresses.filter(addr => addr.id !== id) 
          }));
          return true;
        } catch (error) {
          set({ 
            error: error.response?.data?.message || "Erreur lors de la suppression"
          });
          throw error;
        }
      },

      setDefaultAddress: async (id) => {
        const userId = get().getUserId();
        if (!userId) {
          set({ error: "Utilisateur non authentifié" });
          throw new Error("Utilisateur non authentifié");
        }

        try {
          await axiosInstance.patch(`/addresses/${userId}`);
          set(state => ({
            addresses: state.addresses.map(addr => ({
              ...addr,
              is_default: addr.id === id
            }))
          }));
          return true;
        } catch (error) {
          set({ 
            error: error.response?.data?.message || "Erreur lors de la mise à jour"
          });
          throw error;
        }
      },

      // Réinitialisation
      reset: () => set({ 
        addresses: [], 
        isLoading: false, 
        error: null,
        hasLoaded: false
      }),
    }),
    {
      name: "addresses-store",
    }
  )
);

export default useAddressesStore;
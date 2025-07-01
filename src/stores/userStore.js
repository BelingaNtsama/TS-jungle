import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "@services/axiosInstance";

const useUserStore = create(
  devtools(
    (set, get) => ({
      // État initial
      userData: null,
      isLoading: false,
      error: null,
      hasLoaded: false,

      // Récupère l'ID utilisateur depuis le localStorage
      getUserId: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.id || null;
      },

      // Actions synchrones
      setUserData: (userData) => set({ userData }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Méthodes asynchrones
      loadUserData: async () => {
        if (get().hasLoaded) return;
        
        const userId = get().getUserId();
        if (!userId) {
          set({ error: "Utilisateur non authentifié" });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const { data } = await axiosInstance.get(`/profile/${userId}`);
          
          set({ 
            userData: {
              id: data.id,
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              phone: data.phone,
              newsletter: data.newsletter,
              offers: data.offers,
              memberSince:data.member_since,
              totalOrders: data.total_orders,
              profileImage: data.picture || "/placeholder.svg?height=128&width=128"
            },
            isLoading: false,
            hasLoaded: true
          });
        } catch (error) {
          set({ 
            error: error.response?.data?.message || "Erreur lors du chargement des données utilisateur",
            isLoading: false 
          });
        }
      },

      updateUserData: async (updatedFields) => {
        const userId = get().getUserId();
        if (!userId) {
          set({ error: "Utilisateur non authentifié" });
          throw new Error("Utilisateur non authentifié");
        }

        set({ isLoading: true, error: null });
        try {
          // Formatage pour l'API
          const apiData = {
            first_name: updatedFields.firstName,
            last_name: updatedFields.lastName,
            email: updatedFields.email,
            phone: updatedFields.phone,
            newsletter: updatedFields.newsletter,
            offers: updatedFields.offers
          };

          const { data } = await axiosInstance.put(`/users/${userId}`, apiData);

          // Mise à jour du state avec les nouvelles données
          set(state => ({
            userData: {
              ...state.userData,
              ...updatedFields
            },
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

      updateProfileImage: async (file) => {
        const userId = get().getUserId();
        if (!userId) {
          set({ error: "Utilisateur non authentifié" });
          throw new Error("Utilisateur non authentifié");
        }

        set({ isLoading: true, error: null });
        try {
          const formData = new FormData();
          formData.append('picture', file);

          // Upload de l'image
          const { data } = await axiosInstance.post(
            `/users/${userId}/picture`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );

          // Mise à jour de l'image dans le state
          set(state => ({
            userData: {
              ...state.userData,
              profileImage: data.pictureUrl
            },
            isLoading: false
          }));

          return data;
        } catch (error) {
          set({ 
            error: error.response?.data?.message || "Erreur lors de l'upload de l'image",
            isLoading: false 
          });
          throw error;
        }
      },

      updatePassword: async (currentPassword, newPassword) => {
        const userId = get().getUserId();
        if (!userId) {
          set({ error: "Utilisateur non authentifié" });
          throw new Error("Utilisateur non authentifié");
        }

        set({ isLoading: true, error: null });
        try {
          await axiosInstance.patch(`/users/${userId}/password`, {
            current_password: currentPassword,
            new_password: newPassword
          });

          set({ isLoading: false });
        } catch (error) {
          set({ 
            error: error.response?.data?.message || "Erreur lors du changement de mot de passe",
            isLoading: false 
          });
          throw error;
        }
      },

      toggleTwoFactorAuth: async (enable) => {
        const userId = get().getUserId();
        if (!userId) {
          set({ error: "Utilisateur non authentifié" });
          throw new Error("Utilisateur non authentifié");
        }

        set({ isLoading: true, error: null });
        try {
          await axiosInstance.patch(`/users/${userId}/two-factor-auth`, {
            enable
          });

          set(state => ({
            userData: {
              ...state.userData,
              twoFactorEnabled: enable
            },
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: error.response?.data?.message || "Erreur lors de la mise à jour de la 2FA",
            isLoading: false 
          });
          throw error;
        }
      },
 // Action pour vérifier l'authentification via le token
  checkAuth: async () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');

    if (accessToken) {
      try {
        // 1. Valider le token avec le backend
        const response = await axiosInstance.post(
          'auth/token',
          { access_token: accessToken }
        );
        localStorage.clear()
        localStorage.setItem('user', JSON.stringify(response.data));
        set({ 
          userData: response.data,
          isLoading: false,
          hasLoaded: true
        });
        // 5. Nettoyer l'URL et rediriger vers /
          window.location.href = 'http://localhost:5173/';
      } catch (error) {
        console.error(error);
      }
    }
  },
      // Réinitialisation
      reset: () => set({ 
        userData: null,
        isLoading: false,
        error: null,
        hasLoaded: false
      }),
    }),
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
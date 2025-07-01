import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axiosInstance from "@services/axiosInstance";

const useFavoritesStore = create(
  devtools(
    persist(
      (set, get) => ({
        // État initial
        favorites: [],
        isLoading: false,
        error: null,
        hasLoaded: false,

        // Récupère l'ID utilisateur
        getUserId: () => {
          const user = JSON.parse(localStorage.getItem('user'));
          return user?.id || null;
        },

        // Actions synchrones
        setFavorites: (favorites) => set({ favorites, hasLoaded: true }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),

        // Méthodes asynchrones
        loadFavorites: async () => {
          const userId = get().getUserId();
          if (!userId) {
            set({ error: "Utilisateur non authentifié" });
            return;
          }

          if (get().hasLoaded) return;

          set({ isLoading: true, error: null });
          try {
            const { data } = await axiosInstance.get(`/favorites/${userId}`)
            set({ 
              favorites: data.data,
              isLoading: false,
              hasLoaded: true
            });
          } catch (error) {
            set({ 
              error: error.response?.data?.message || "Erreur de chargement",
              isLoading: false
            });
          }
        },

        addToFavorites: async (product) => {
          const userId = get().getUserId();
          if (!userId) {
            set({ error: "Utilisateur non authentifié" });
            throw new Error("Authentification requise");
          }

          set({ isLoading: true, error: null });
          try {
            const { data } = await axiosInstance.post('/favorites', {
              plant_id: product.id
            });

            set(state => ({
              favorites: [...state.favorites, product],
              isLoading: false
            }));

            return data;
          } catch (error) {
            set({ 
              error: error.response?.data?.message || "Erreur d'ajout",
              isLoading: false
            });
            throw error;
          }
        },

        removeFromFavorites: async (productId) => {
          const userId = get().getUserId();
          if (!userId) {
            set({ error: "Utilisateur non authentifié" });
            throw new Error("Authentification requise");
          }

          set({ isLoading: true, error: null });
          try {
            await axiosInstance.delete(`/favorites/${productId}`);

            set(state => ({
              favorites: state.favorites.filter(item => item.id !== productId),
              isLoading: false
            }));
          } catch (error) {
            set({ 
              error: error.response?.data?.message || "Erreur de suppression",
              isLoading: false
            });
            throw error;
          }
        },

        isFavorite: (productId) => {
          return get().favorites.some(item => item.id === productId);
        },

        // Réinitialisation
        reset: () => set({ 
          favorites: [],
          isLoading: false,
          error: null,
          hasLoaded: false
        }),
      }),
      {
        name: "favorites-storage",
        partialize: (state) => ({ favorites: state.favorites }),
      }
    ),
    { name: "FavoritesStore" }
  )
);

export default useFavoritesStore;
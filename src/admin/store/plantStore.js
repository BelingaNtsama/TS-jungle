import { create } from 'zustand';
import axiosInstance from '../../services/axiosInstance';

const usePlantStore = create((set) => ({
  plants: [],
  isLoading: false,
  error: null,

  fetchPlants: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get('/plantes');
      set({ 
        plants: response.data,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        error: "Erreur lors du chargement des plantes",
        isLoading: false
      });
      console.error("Erreur lors du chargement des plantes :", error);
    }
  }
}));

export default usePlantStore;
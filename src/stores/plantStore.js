import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

const PlantStore = create((set, get) => ({
  isCartOpen: false,
  cartItems: [],
  isDataLoaded: false, // Nouvel état pour suivre si les données sont chargées
  setCartItems: (items) => set({ cartItems: items }),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  removeFromCart: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.plant.id !== itemId),
    })),
  updateCartItemQuantity: (itemId, newQuantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.plant.id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    })),
  fetchPlants: async () => {
    const {  isDataLoaded } = get(); // Récupérer les données actuelles du store

    if (isDataLoaded === true) {
      // Si les données sont déjà chargées, ne pas faire d'appel API
      return;
    }

    try {
      const response = await axiosInstance.get('/plantes');
      const plants = response.data.map((plant) => ({
        plant,
        quantity: 0, // Vous pouvez ajuster la quantité par défaut
      }));
      set({ cartItems: plants, isDataLoaded: true }); // Marquer les données comme chargées
    } catch (error) {
      console.error("Erreur lors du chargement des plantes :", error);
    }
  },
}));

export default PlantStore;
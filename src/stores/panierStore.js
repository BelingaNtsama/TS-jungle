import { create } from 'zustand';

const usePanierStore = create((set, get) => ({
  isCartOpen: false,
  cartItems: [
     {
      plant: {
        id: 1,
        name: " ",
        price: 0,
        image: " ",
        category: " ",
        description: " ",
        stock: 0,
        disponibilite: true,
      },
      quantity: 0,
    },
  ],

  // Actions
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  addToCart: (plant) => set((state) => {
    const exists = state.cartItems.some(item => item.plant.id === plant.id);
    if (exists) return state;
    return { 
      cartItems: [...state.cartItems, { plant, quantity: 1 }] 
    };
  }),

  removeFromCart: (plantId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.plant.id !== plantId)
  })),

  updateCartItemQuantity: (plantId, quantity) => set((state) => ({
    cartItems: state.cartItems.map(item => 
      item.plant.id === plantId ? { ...item, quantity } : item
    )
  })),

  // Calcul du total (corrigé)
  getTotal: () => {
    return get().cartItems.reduce(
      (total, item) => total + (item.plant.price * item.quantity),
      0
    );
  },

  // Réinitialisation
  resetCart: () => set({  cartItems: [
     {
      plant: {
        id: 1,
        name: " ",
        price: 0,
        image: " ",
        category: " ",
        description: " ",
        stock: 0,
        disponibilite: true,
      },
      quantity: 0,
    },
  ],})
}));

export default usePanierStore;
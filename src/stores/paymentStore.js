import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "@/services/axiosInstance";
import usePanierStore from "@/stores/panierStore";

const usePaymentStore = create(
  devtools(
    (set, get) => ({
      // État initial
      paymentMethods: [],
      isLoading: false,
      error: null,
      selectedMethod: null,
      isProcessing: false,
      paymentSuccess: false,

      // Initialisation
      init: async () => {
        const userId = get().getUserId();
        if (!userId) return;

        await get().loadPaymentMethods();
        const defaultMethod = get().paymentMethods.find((m) => m.default);
        set({ selectedMethod: defaultMethod?.id || null });
      },

      // Récupère l'ID de l'utilisateur depuis localStorage
      getUserId: () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.id || null;
      },

      // Charge les méthodes de paiement depuis l'API
      loadPaymentMethods: async () => {
        const userId = get().getUserId();
        if (!userId) return;

        set({ isLoading: true, error: null });
        try {
          const { data } = await axiosInstance.get(`/payment/${userId}`);
          set({ paymentMethods: data, isLoading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Erreur de chargement",
            isLoading: false,
          });
        }
      },

      // Ajoute une nouvelle méthode de paiement
      addPaymentMethod: async (paymentData) => {
        const userId = get().getUserId();
        if (!userId) throw new Error("Utilisateur non authentifié");

        set({ isLoading: true });
        try {
          const { data } = await axiosInstance.post(
            `/add-payment/${userId}`,
            formatPaymentData(paymentData)
          );

          set((state) => ({
            paymentMethods: [...state.paymentMethods, data],
            selectedMethod: data.id,
            isLoading: false,
          }));

          return data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Erreur d'ajout",
            isLoading: false,
          });
          throw error;
        }
      },

      // Supprime une méthode de paiement
      deletePaymentMethod: async (id) => {
        const userId = get().getUserId();
        if (!userId) throw new Error("Utilisateur non authentifié");

        const methods = get().paymentMethods;
        const methodToDelete = methods.find((m) => m.id === id);

        if (methodToDelete?.default && methods.length > 1) {
          throw new Error("Impossible de supprimer le moyen par défaut");
        }

        try {
          await axiosInstance.delete(`/delete-payment/${userId}/${id}`);

          set((state) => ({
            paymentMethods: state.paymentMethods.filter((m) => m.id !== id),
            selectedMethod: state.selectedMethod === id ? null : state.selectedMethod,
          }));
        } catch (error) {
          set({
            error: error.response?.data?.message || "Erreur de suppression",
          });
          throw error;
        }
      },

      // Définit une méthode de paiement comme méthode par défaut
      setDefaultPaymentMethod: async (id) => {
        const userId = get().getUserId();
        if (!userId) throw new Error("Utilisateur non authentifié");

        try {
          await axiosInstance.patch(`/default-payment/${userId}/${id}`);

          set((state) => ({
            paymentMethods: state.paymentMethods.map((m) => ({
              ...m,
              default: m.id === id,
            })),
          }));
        } catch (error) {
          set({
            error: error.response?.data?.message || "Erreur de mise à jour",
          });
          throw error;
        }
      },

      // Traite le paiement
      processPayment: async () => {
        const { selectedMethod, paymentMethods } = get();
        const { cartItems } = usePanierStore.getState();
        const userId = usePaymentStore.getState().getUserId();

        if (!selectedMethod) throw new Error("Aucune méthode sélectionnée");

        set({ isProcessing: true, error: null });
        try {
          const method = paymentMethods.find((m) => m.id === selectedMethod);
          const total = calculateTotal(cartItems);

          const { data } = await axiosInstance.post(`/processPayment/${userId}`, {
            payment_method_id: selectedMethod,
            amount: total,
            items: cartItems.map((item) => ({
              plant_id: item.plant.id,
              quantity: item.quantity,
              unit_price: item.plant.price,
            })),
          });

          set({ paymentSuccess: true });
          usePanierStore.getState().resetCart();
          return data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Erreur de paiement",
            isProcessing: false,
          });
          throw error;
        } finally {
          set({ isProcessing: false });
        }
      },

      // Sélectionne une méthode de paiement
      selectPaymentMethod: (id) => set({ selectedMethod: id }),

      // Réinitialise l'état
      reset: () =>
        set({
          paymentMethods: [],
          selectedMethod: null,
          paymentSuccess: false,
          error: null,
        }),
    }),
    { name: "payment-store" }
  )
);

// Helper function : Formate les données pour correspondre au format attendu
const formatPaymentData = (data) => {
  if (data.type === "card") {
    return {
      type: "card",
      brand: data.brand,
      cvv: data.cvv,
      exp_month: data.exp_month,
      exp_year: data.exp_year,
      cardNumber: data.cardNumber,
    };
  }
  if (data.type === "paypal") {
    return {
      type: "paypal",
      email: data.email,
    };
  }
  return data;
};

// Helper function : Calcule le montant total du panier
const calculateTotal = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.plant.price * item.quantity,
    0
  );
};

export default usePaymentStore;
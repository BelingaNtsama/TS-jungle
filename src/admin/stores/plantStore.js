import { create } from 'zustand';
import { toast } from 'sonner';
import axiosInstance from "@/services/axiosInstance"

const useProductsStore = create((set) => ({
  products: [],
  searchText: '',
  selectedRows: [],
  isRefreshing: false,
  setProducts: (products) => set({ products }),
  setSearchText: (searchText) => set({ searchText }),
  setSelectedRows: (selectedRows) => set({ selectedRows }),
  setIsRefreshing: (isRefreshing) => set({ isRefreshing }),
  fetchProducts: async () => {
    try {
      const response = await axiosInstance.get('/api/products');
      const data = await response.data
      set({ products: data });
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  },
  handleEdit: (product) => {
    console.log('Modifier le produit:', product);
    toast.info(`Modification de "${product.name}" en cours...`);
    set((state) => ({
      products: state.products.map((item) =>
        item.id === product.id ? { ...item, lastUpdated: new Date().toISOString().split('T')[0] } : item
      ),
    }));
    toast.success(`"${product.name}" a été modifié avec succès!`);
  },
  handleDelete: (productId) => {
    set((state) => ({
      products: state.products.filter((item) => item.id !== productId),
    }));
    toast.success('Produit supprimé avec succès!');
  },
  handleView: (product) => {
    console.log('Voir le produit:', product);
    toast.info(`Affichage des détails de "${product.name}"`);
  },
  handleDuplicate: (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...useProductsStore.getState().products.map((p) => p.id)) + 1,
      name: `${product.name} (Copie)`,
      stock: 0,
      status: 'Out of Stock',
      sales: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    set((state) => ({
      products: [...state.products, newProduct],
    }));
    toast.success(`"${product.name}" a été dupliqué avec succès!`);
  },
  handleArchive: (productId) => {
    set((state) => ({
      products: state.products.filter((item) => item.id !== productId),
    }));
    toast.warning('Produit archivé avec succès!');
  },
  handleBulkDelete: (productIds) => {
    set((state) => ({
      products: state.products.filter((item) => !productIds.includes(item.id)),
      selectedRows: [],
    }));
    toast.success(`${productIds.length} produit(s) supprimé(s) avec succès!`);
  },
  handleRefresh: async () => {
    set({ isRefreshing: true });
    toast.info('Actualisation des données...');
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Données actualisées avec succès!');
    } catch (error) {
      toast.error('Erreur lors de l\'actualisation des données');
    } finally {
      set({ isRefreshing: false });
    }
  },
}));

export default useProductsStore;

import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import useFavoritesStore from "@/stores/favoritesStore";
import { formatPrice } from "@/utils/formatters";
import { toast } from "sonner";

export default function FavoritesList() {
  const { 
    favorites , 
    isLoading, 
    error,
    loadFavorites,
    removeFromFavorites,
  } = useFavoritesStore();
  
  const [cartItems, setCartItems] = useState([]);

  // Chargement initial
  useEffect(() => {
    loadFavorites();
  }, []);

  // Gestion des interactions
  const handleRemoveFromFavorites = useCallback(async (productId) => {
    try {
      await removeFromFavorites(productId);
      toast.success("Retiré des favoris");
    } catch (error) {
      toast.error(error.message);
    }
  }, [removeFromFavorites]);

  const handleAddToCart = useCallback((product) => {
    setCartItems(prev => [...prev, product.id]);
    toast.success(`${product.name} ajouté au panier`);
    setTimeout(() => setCartItems(prev => prev.filter(id => id !== product.id)), 2000);
  }, []);

  // Protection contre les données invalides
  const safeFavorites = Array.isArray(favorites) ? favorites : [];

  // États de rendu
  if (error) {
    return (
      <div className="alert alert-error mt-8">
        <span>{error}</span>
      </div>
    );
  }

  if (isLoading) {
    return <SkeletonLoader type="card" count={4} className="mt-8" />;
  }

  if (safeFavorites.length === 0) {
    return (
      <div className="card bg-base-100 shadow-sm mt-8">
        <div className="card-body text-center py-16">
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold">Aucun favori</h3>
          <p className="text-gray-500 mb-6">
            Vos plantes favorites apparaîtront ici
          </p>
          <Link to="/plants" className="btn btn-primary">
            Explorer les plantes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mes plantes favorites</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeFavorites.map(product => (
          <motion.div
            key={product.id}
            className="card bg-white shadow-md rounded-lg overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <div className="relative aspect-square">
              <img
                src={product.image || '/placeholder-plant.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = '/placeholder-plant.jpg'}
              />
              <button
                onClick={() => handleRemoveFromFavorites(product.id)}
                className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                aria-label="Retirer des favoris"
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.category}</p>
              
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-600">
                  {formatPrice(product.price)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={cartItems.includes(product.id)}
                  className={`btn btn-sm ${cartItems.includes(product.id) ? 'btn-success' : 'btn-primary'}`}
                >
                  <ShoppingCart className="mr-2" size={16} />
                  {cartItems.includes(product.id) ? 'Ajouté !' : 'Ajouter'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
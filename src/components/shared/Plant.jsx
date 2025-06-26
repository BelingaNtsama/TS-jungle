import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, Info } from 'lucide-react';
import PanierStore from '../../stores/panierStore';
import PlantModal from './PlantModal';
import { toast } from 'sonner';

const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center space-x-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
      />
    ))}
    <span className="text-sm text-gray-600 ml-2">({reviews} reviews)</span>
  </div>
);

const PlantCard = ({ plant }) => {
  const { cartItems, addToCart } = PanierStore();
  const [disable, setDisable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setDisable(cartItems.some(item => item.plant.id === plant.id));
  }, [cartItems, plant.id]);

  const handleAddToCart = () => {
    toast.success(`${plant.name} a ete ajoute avec succes au panier`)
    addToCart(plant);
    setDisable(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img src={plant.image} alt={plant.name} className="w-full h-72 object-cover" />
          <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
          <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600">
            {plant.category || "Indoor"}
          </div>
        </div>
        <div className="p-6">
          <StarRating rating={plant.rating || 4} reviews={plant.reviews || 128} />
          <h3 className="text-xl font-semibold text-gray-900">{plant.name}</h3>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">${plant.price.toFixed(2)}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 btn  rounded-lg hover:bg-gray-200 transition"
              >
                <Info className="h-5 w-5" />
              </button>
              <button
                disabled={disable}
                onClick={handleAddToCart}
                className={`px-6 py-2 rounded-lg transition flex items-center ${
                  disable ? "bg-gray-400 cursor-not-allowed " : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {disable ? "Added" : "Add to Cart"}
                <ShoppingCart className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modale DaisyUI */}
      {isModalOpen && <PlantModal plant={plant} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default PlantCard;

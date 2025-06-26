import { ShoppingCart } from 'lucide-react';
import useUIStore from '../../store/useUIStore';

const OpenCartButton = () => {
  const { openCart, cartItems } = useUIStore();

  return (
    <button
      onClick={openCart}
      className="btn btn-primary fixed bottom-8 right-8 shadow-lg"
    >
      <ShoppingCart className="h-6 w-6" />
      {cartItems.length > 0 && (
        <span className="badge badge-secondary absolute -top-2 -right-2">
          {cartItems.length}
        </span>
      )}
    </button>
  );
};

export default OpenCartButton;
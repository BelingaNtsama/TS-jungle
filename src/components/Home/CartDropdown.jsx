import { memo } from 'react';
import { Link } from 'react-router-dom';
import { LucideShoppingBag } from 'lucide-react';

const CartDropdown = memo(({ itemCount, subtotal, onOpenCart }) => {
  return (
    <div className="dropdown dropdown-end">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost btn-circle hover:bg-secondary focus:outline-none"
        aria-label="Shopping cart"
      >
        <div className="indicator">
          <LucideShoppingBag className="w-5 h-5" />
          <span className="badge badge-sm indicator-item">
            {Math.max(0, itemCount)}
          </span>
        </div>
      </div>
      
      <div 
        tabIndex={0} 
        className="card card-compact dropdown-content bg-base-100 z-[100] mt-3 w-72 shadow-lg rounded-box"
      >
        <div className="card-body">
          <span className="text-lg font-bold text-gray-700">
            {Math.max(0, itemCount)} Items
          </span>
          <span className="text-xl font-semibold text-gray-700">
            Subtotal: {subtotal.toFixed(2)}€
          </span>
          <div className="card-actions">
            <button 
              onClick={onOpenCart}
              className="btn btn-primary btn-block text-white hover:brightness-110 transition-all"
            >
              Voir le panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CartDropdown.displayName = 'CartDropdown';

export default CartDropdown;

import { X, Minus, Plus } from 'lucide-react';

const PlantImage = ({ image, name }) => (
  <div className="relative w-20 h-20">
    <img
      src={image}
      alt={name}
      className="w-full h-full rounded-lg object-cover shadow-sm"
    />
    <div className="absolute inset-0 ring-1 ring-inset ring-base-300 rounded-lg"></div>
  </div>
);

const PlantInfo = ({ name, category, onRemove }) => (
  <div className="flex justify-between">
    <div>
      <h3 className="text-lg font-medium text-base-content group-hover:text-neutral transition-colors">
        {name}
      </h3>
      <p className="text-sm text-base-content/70">{category}</p>
    </div>
    <button
      onClick={onRemove}
      className="btn btn-ghost btn-sm text-base-content/50 hover:text-error"
    >
      <X className="h-4 w-4" />
    </button>
  </div>
);

const QuantityControls = ({ quantity, onUpdateQuantity }) => (
  <div className="flex items-center border border-base-300 rounded-lg bg-base-200">
    <button
      onClick={() => onUpdateQuantity(quantity - 1)}
      disabled={quantity <= 1}
      className="btn btn-ghost btn-sm disabled:opacity-50"
    >
      <Minus className="h-4 w-4" />
    </button>
    <span className="w-12 text-center text-base-content font-medium">
      {quantity}
    </span>
    <button
      onClick={() => onUpdateQuantity(quantity + 1)}
      className="btn btn-ghost btn-sm"
    >
      <Plus className="h-4 w-4" />
    </button>
  </div>
);

const CartItem = ({ plant, quantity, onUpdateQuantity, onRemove }) => (
  <div className="flex items-center py-4 border-b border-base-200 group hover:bg-green-100 rounded-lg transition-colors duration-200">
    <PlantImage image={plant.image} name={plant.name} />
    <div className="ml-4 flex-1">
      <PlantInfo name={plant.name} category={plant.category} onRemove={onRemove} />
      <div className="mt-2 flex items-center justify-between">
        <QuantityControls quantity={quantity} onUpdateQuantity={onUpdateQuantity} />
        <p className="text-lg font-medium text-base-content">
          ${(plant.price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  </div>
);

export default CartItem;
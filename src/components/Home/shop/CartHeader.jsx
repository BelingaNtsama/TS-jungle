const CartHeader = ({ itemCount }) => (
  <div className="p-6 border-b border-base-200">
    <h2 className="text-2xl font-bold text-gray-500 text-center">Shopping Cart</h2>
    <p className="mt-2 text-gray-500 text-sm text-center">{itemCount-1} items</p>
  </div>
);

export default CartHeader;
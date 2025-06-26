const CartSummary = ({ subtotal, shipping, total, setIsPaymentModalOpen}) => (
  <div className="p-6 border-t border-base-200 bg-base-100  w-full">
    <div className="space-y-2 mb-4">
      <div className="flex justify-between text-base-content">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-base-content">
        <span>Shipping</span>
        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
      </div>
      <div className="flex justify-between text-lg font-bold  pt-4 border-t border-base-200">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>

    <button className="btn bg-green-600 w-full text-white"
     onClick={() => setIsPaymentModalOpen(true)}>
      Proceed to Checkout
    </button>
  </div>
);

export default CartSummary;
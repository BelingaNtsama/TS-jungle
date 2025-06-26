import { Truck, ShieldCheck, CreditCard } from 'lucide-react';
import Feature from '../../shared/Feature'

const CartAdditionalInfo = () => (
  <div className="p-6 space-y-4">
    <div className="alert">
      <Feature Icon={Truck} title={"Free shipping"} description={"Free shipping on orders over $100"}/>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="alert">
        <Feature Icon={ShieldCheck} title={"Secure checkout"} description={"Your data is safe with us"}/>
      </div>
      <div className="alert">
        <Feature Icon={CreditCard} title={"Major cards accepted"} description={"Visa, Mastercard, American Express"}/>
      </div>
    </div>
  </div>
);

export default CartAdditionalInfo;
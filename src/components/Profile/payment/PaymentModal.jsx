
import { X } from 'lucide-react';
import { Payment } from './Payment';

export function PaymentModal({ isOpen, onClose, amount }) {
  if (!isOpen) return null;

  const handleSuccess = () => {
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-backdrop" onClick={onClose}></div>
      
      <div className="modal-box max-w-2xl relative">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          <X className="w-5 h-5" />
        </button>
        
        <Payment 
          amount={amount} 
          onSuccess={handleSuccess}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
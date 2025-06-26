import { useState } from "react";
import { CreditCard } from "lucide-react";
// Modal pour ajouter une nouvelle méthode de paiement
const PaymentMethodModal = ({ isOpen, onClose, onSubmit }) => {
  const [paymentType, setPaymentType] = useState("card");
  const [formData, setFormData] = useState({
    brand: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    email: "",
  });

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").slice(0, 16);
  };

  const formatCVV = (value) => {
    return value.replace(/\D/g, "").slice(0, 4);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "cardNumber") {
      setFormData(prev => ({ ...prev, [name]: formatCardNumber(value) }));
      return;
    }
    
    if (name === "cvv") {
      setFormData(prev => ({ ...prev, [name]: formatCVV(value) }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (paymentType === "card") {
      if (!formData.brand || !formData.cardNumber || !formData.expMonth || !formData.expYear || !formData.cvv) {
        alert("Veuillez remplir tous les champs obligatoires");
        return;
      }
      
      if (formData.cardNumber.length !== 16) {
        alert("Le numéro de carte doit contenir 16 chiffres");
        return;
      }
      
      if (formData.cvv.length < 3) {
        alert("Le code de sécurité doit contenir au moins 3 chiffres");
        return;
      }
    }

    const paymentData = {
      type: paymentType,
      ...(paymentType === "card" ? {
        brand: formData.brand,
        cardNumber: formData.cardNumber,
        exp_month: formData.expMonth,
        exp_year: formData.expYear,
        cvv: formData.cvv,
        last4: formData.cardNumber.slice(-4)
      } : {
        email: formData.email
      })
    };

    onSubmit(paymentData);
    onClose();
  };

  const resetForm = () => {
    setFormData({
      brand: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvv: "",
      email: "",
    });
  };

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-md">
        <form method="dialog">
          <button 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Ajouter un moyen de paiement
        </h3>
        
        <div className="tabs tabs-boxed mb-6">
          <button
            type="button"
            className={`tab ${paymentType === "card" ? "tab-active" : ""}`}
            onClick={() => setPaymentType("card")}
          >
            Carte bancaire
          </button>
          <button
            type="button"
            className={`tab ${paymentType === "paypal" ? "tab-active" : ""}`}
            onClick={() => setPaymentType("paypal")}
          >
            PayPal
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {paymentType === "card" ? (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Type de carte</span>
                </label>
                <select
                  name="brand"
                  className="select select-bordered"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Sélectionner...</option>
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Numéro de carte</span>
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="input input-bordered"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Mois d'expiration</span>
                  </label>
                  <select
                    name="expMonth"
                    className="select select-bordered"
                    value={formData.expMonth}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Année d'expiration</span>
                  </label>
                  <select
                    name="expYear"
                    className="select select-bordered"
                    value={formData.expYear}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>YYYY</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Code de sécurité (CVV)</span>
                </label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  className="input input-bordered"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          ) : (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email PayPal</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="votre@email.com"
                className="input input-bordered"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          
          <div className="modal-action">
            <button 
              type="button" 
              className="btn btn-ghost" 
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default PaymentMethodModal;
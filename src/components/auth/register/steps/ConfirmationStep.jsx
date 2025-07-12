import { memo } from 'react';
import { motion } from 'framer-motion';
import FormCard from '../FormCard';

const stepVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" }},
  exit: { opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" }}
};

const ConfirmationStep = ({ watch, isSubmitting, onSubmit }) => {
  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 w-full max-w-4xl mx-auto"
    >
      <FormCard
        title="Confirmation finale"
        description="Vérifiez vos informations avant soumission"
      />
      
      <div className="bg-base-200 p-6 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-4">Récapitulatif</h3>
        <div className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm md:text-base">
                <strong>Nom:</strong> {watch('first_name')} {watch('last_name')}
              </p>
              <p className="text-sm md:text-base">
                <strong>Email:</strong> {watch('email')}
              </p>
              <p className="text-sm md:text-base">
                <strong>Téléphone:</strong> {watch('phone')}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm md:text-base">
                <strong>Adresse:</strong><br />
                {watch('street')},<br />
                {watch('postal_code')} {watch('city')},<br />
                {watch('country')}
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-base-300">
            <p className="text-sm md:text-base"><strong>Préférences:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm md:text-base">
              {watch('newsletter') && <li>Newsletter</li>}
              {watch('offer') && <li>Offres spéciales</li>}
              {watch('twoFactorAuth') && <li>Authentification 2FA</li>}
            </ul>
          </div>
        </div>
        
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="btn btn-success w-full mt-6 md:mt-8"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            'Confirmer et soumettre'
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default memo(ConfirmationStep);

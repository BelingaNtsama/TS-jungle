import { memo } from 'react';
import { motion } from 'framer-motion';
import { Controller } from 'react-hook-form';
import { Home, MapPin } from 'lucide-react';
import AuthFormInput from '../AuthFormInput';
import FormCard from '../FormCard';

const addressFields = [
  {
    name: 'address_name',
    label: 'Nom de l\'adresse',
    type: 'text',
    placeholder: 'Domicile, Bureau...',
    icon: <Home className="w-4 h-4 md:w-5 md:h-5 text-base-content/50" />,
    rules: {
      required: false
    }
  },
  {
    name: 'street',
    label: 'Adresse complète *',
    type: 'text',
    placeholder: '123 Rue de la Paix, Appartement 4B',
    icon: <MapPin className="w-4 h-4 md:w-5 md:h-5 text-base-content/50" />,
    rules: {
      required: 'L\'adresse est requise',
      minLength: { value: 5, message: 'Au moins 5 caractères' }
    }
  },
  {
    name: 'postal_code',
    label: 'Code postal *',
    type: 'text',
    placeholder: '75001',
    rules: {
      required: 'Le code postal est requis',
      pattern: { 
        value: /^[0-9]{5}$/, 
        message: 'Format: 75001' 
      }
    }
  },
  {
    name: 'city',
    label: 'Ville *',
    type: 'text',
    placeholder: 'Paris',
    rules: {
      required: 'La ville est requise',
      minLength: { value: 2, message: 'Au moins 2 caractères' }
    }
  },
  {
    name: 'country',
    label: 'Pays *',
    type: 'text',
    placeholder: 'France',
    rules: {
      required: 'Le pays est requis'
    }
  }
];

const stepVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" }},
  exit: { opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" }}
};

const AddressStep = ({ control, errors }) => {
  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4 md:space-y-6 w-full max-w-4xl mx-auto"
    >
      <FormCard
        title="Où vous livrer ?"
        description="Renseignez votre adresse de livraison"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {addressFields.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: { value, onChange } }) => (
              <AuthFormInput
                label={field.label}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={value}
                onChange={onChange}
                error={errors[field.name]?.message}
                icon={field.icon}
                inputClassName={field.icon ? "pl-10 md:pl-12" : ""}
              />
            )}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default memo(AddressStep);

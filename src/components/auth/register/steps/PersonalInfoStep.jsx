import { memo } from 'react';
import { motion } from 'framer-motion';
import { Controller } from 'react-hook-form';
import { User, Mail, Phone, AlertCircle } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import AuthFormInput from '../AuthFormInput';
import FormCard from '../FormCard';
import ProfileImageUploader from '../ProfileImageUpload';

const MemoizedPhoneInput = memo(PhoneInput);

const personalInfoFields = [
  {
    name: 'first_name',
    label: 'Prénom *',
    type: 'text',
    placeholder: 'Jean',
    icon: <User className="w-4 h-4 md:w-5 md:h-5 text-base-content/50" />,
    rules: {
      required: 'Le prénom est requis',
      minLength: { value: 2, message: 'Au moins 2 caractères' }
    }
  },
  {
    name: 'last_name',
    label: 'Nom *',
    type: 'text',
    placeholder: 'Dupont',
    icon: <User className="w-4 h-4 md:w-5 md:h-5 text-base-content/50" />,
    rules: {
      required: 'Le nom est requis',
      minLength: { value: 2, message: 'Au moins 2 caractères' }
    }
  },
  {
    name: 'email',
    label: 'Adresse email *',
    type: 'email',
    placeholder: 'jean.dupont@email.com',
    icon: <Mail className="w-4 h-4 md:w-5 md:h-5 text-base-content/50" />,
    rules: {
      required: 'L\'email est requis',
      pattern: { 
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
        message: 'Format email invalide' 
      }
    }
  },
  {
    name: 'password',
    label: 'Mot de passe *',
    type: 'password',
    placeholder: '••••••••',
    rules: {
      required: 'Le mot de passe est requis',
      minLength: { 
        value: 8, 
        message: 'Le mot de passe doit contenir au moins 8 caractères' 
      }
    }
  },
  {
    name: 'confirmPassword',
    label: 'Confirmer le mot de passe *',
    type: 'password',
    placeholder: '••••••••',
    rules: {
      required: 'La confirmation est requise',
      validate: (value, formValues) => 
        value === formValues.password || 'Les mots de passe ne correspondent pas'
    }
  }
];

const stepVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" }},
  exit: { opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" }}
};

const PersonalInfoStep = ({ control, errors, profileImage, handleImageUpload, handlePhoneChange }) => {
  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4 md:space-y-6 w-full max-w-4xl mx-auto"
    >
      <FormCard
        title="Créons votre profil"
        description="Commençons par vos informations personnelles"
      />

      <ProfileImageUploader 
        profileImage={profileImage}
        onImageUpload={handleImageUpload}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {personalInfoFields.map((field) => (
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

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Numéro de téléphone *</span>
        </label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Le numéro est requis',
            validate: (value) => !value || value.length < 8 ? 'Numéro invalide' : true
          }}
          render={({ field }) => (
            <div className="relative">
              <MemoizedPhoneInput
                {...field}
                placeholder="+237 6 12 34 56 78"
                defaultCountry="CM"
                value={field.value}
                onChange={handlePhoneChange}
                className={`phone-input-custom ${errors.phone ? 'phone-input-error' : ''}`}
              />
              <Phone className="absolute left-4 top-3 md:top-4 h-4 w-4 md:h-5 md:w-5 text-base-content/50 z-10" />
            </div>
          )}
        />
        {errors.phone && (
          <span className="text-error text-xs mt-1 flex items-center">
            <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            {errors.phone.message}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default memo(PersonalInfoStep);

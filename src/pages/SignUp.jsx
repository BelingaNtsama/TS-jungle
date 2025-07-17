import { useState, useCallback,memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { parsePhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { 
  User, Mail, MapPin, Home, Bell, Gift, Shield, AlertCircle, Sparkles, LockIcon, Phone 
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import axiosInstance from '@services/axiosInstance';

// Import des composants
import AuthFormInput from '@components/auth/register/AuthFormInput';
import StepIndicator from '@components/auth/register/StepIndicator';
import FormCard from '@components/auth/register/FormCard';
import ProfileImageUploader from '@components/auth/register/ProfileImageUpload';
import FormNavigation from '@components/auth/register/FormNavigation';
import PreferenceToggleCard from '@components/auth/register/PreferenceToggleCard';
import SuccessStep from '@components/auth/register/SuccessStep';

const addressFields = [
  {
    name: 'address_name',
    label: 'Nom de l\'adresse',
    type: 'text',
    placeholder: 'Domicile, Bureau...',
    Icon: Home,
    rules: {
      required: false
    }
  },
  {
    name: 'street',
    label: 'Adresse complète *',
    type: 'text',
    placeholder: '123 Rue de la Paix, Appartement 4B',
    Icon: MapPin,
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

const preferenceCards = [
  {
    name: 'newsletter',
    Icon: Bell,
    title: 'Newsletter',
    description: 'Recevez nos dernières actualités et conseils',
    color: 'primary'
  },
  {
    name: 'offer',
    Icon: Gift,
    title: 'Offres spéciales',
    description: 'Soyez informé de nos promotions exclusives',
    color: 'secondary'
  },
  {
    name: 'twoFactorAuth',
    Icon: Shield,
    title: 'Authentification 2FA',
    description: 'Renforcez la sécurité de votre compte',
    color: 'accent'
  }
];

const stepsConfig = [
  { 
    number: 1, 
    title: 'Informations', 
    Icon: User, 
    description: 'Données personnelles',
    fields: ['first_name', 'last_name', 'email', 'password', 'confirmPassword', 'phone'],
    component: 'PersonalInfoStep'
  },
  { 
    number: 2, 
    title: 'Adresse', 
    Icon: MapPin, 
    description: 'Livraison',
    fields: ['address_name', 'street', 'postal_code', 'city', 'country'],
    component: 'AddressStep'
  },
  { 
    number: 3, 
    title: 'Préférences', 
    Icon: Bell, 
    description: 'Personnalisation',
    fields: ['newsletter', 'offer', 'twoFactorAuth'],
    component: 'PreferencesStep'
  },
  { 
    number: 4, 
    title: 'Confirmation', 
    Icon: Shield, 
    description: 'Validation finale',
    component: 'ConfirmationStep'
  }
];

const stepVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" }},
  exit: { opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" }}
};

const MemoizedPhoneInput = memo(PhoneInput);

const MultiStepRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('CM');

  const { control, handleSubmit, formState: { errors }, trigger, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      picture: null,
      address_name: 'Principale',
      street: '',
      postal_code: '',
      city: '',
      country: 'CM',
      newsletter: false,
      offer: false,
      twoFactorAuth: false
    }
  });


  // Configuration des champs (déplacé en dehors du composant pour éviter les re-renders)
const personalInfoFields = [
  {
    name: 'first_name',
    label: 'Prénom *',
    type: 'text',
    placeholder: 'Jean',
    Icon: User,
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
    Icon: User,
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
    Icon: Mail,
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
    Icon: LockIcon,
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
    Icon: LockIcon,
    rules: {
      required: 'La confirmation est requise',
      validate: value => 
        value === watch('password') || 'Les mots de passe ne correspondent pas'
    }
  }
];

  const nextStep = useCallback(async () => {
    const currentStepConfig = stepsConfig.find(step => step.number === currentStep);
    if (!currentStepConfig) return;
    
    const isValid = await trigger(currentStepConfig.fields || []);
    if (isValid && currentStep < stepsConfig.length) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, trigger]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La taille de l\'image ne doit pas dépasser 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        setValue('picture', file);
      };
      reader.readAsDataURL(file);
    }
  }, [setValue]);

  const handlePhoneChange = useCallback((value) => {
    setValue('phone', value);
    if (value) {
      try {
        const phoneNumber = parsePhoneNumber(value);
        if (phoneNumber?.country) {
          setSelectedCountryCode(phoneNumber.country);
          setValue('country', phoneNumber.country);
        }
      } catch (error) {
        console.error('Error parsing phone number:', error);
      }
    }
  }, [setValue]);

  const onSubmit = useCallback(async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'picture' && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      
      if (data.picture instanceof File) {
        formData.append('picture', data.picture);
      }

      const response = await axiosInstance.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Inscription réussie:', response.data);
      setCurrentStep(6);
      setTimeout(() => navigate('/'), 4000);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      toast.error(error.response?.data?.error || 'Erreur lors de l\'inscription');
      setCurrentStep(4);
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate]);

  const renderPersonalInfoStep = useCallback(() => {
    return (
      <motion.div
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-4 md:space-y-6"
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
                  Icon={field.Icon ? <field.Icon className="w-4 h-4 md:w-5 md:h-5 text-base-content/50" /> : null}
                  inputClassName={field.Icon ? "pl-10 md:pl-12" : ""}
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
  }, [control, errors, handleImageUpload, handlePhoneChange, profileImage]);

  const renderAddressStep = useCallback(() => {
    return (
      <motion.div
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-4 md:space-y-6"
      >
        <FormCard
          title="Où vous livrer ?"
          description="Renseignez votre adresse de livraison"
        />

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
                Icon={field.Icon}
                inputClassName={field.Icon ? "pl-10 md:pl-12" : ""}
              />
            )}
          />
        ))}
      </motion.div>
    );
  }, [control, errors]);

  const renderPreferencesStep = useCallback(() => {
    return (
      <motion.div
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-4 md:space-y-6"
      >
        <FormCard
          title="Personnalisez votre expérience"
          description="Configurez vos préférences de communication"
        />

        <div className="space-y-3 md:space-y-4">
          {preferenceCards.map((card, index) => (
            <Controller
              key={card.name}
              name={card.name}
              control={control}
              render={({ field }) => (
                <PreferenceToggleCard
                  Icon={card.Icon}
                  title={card.title}
                  description={card.description}
                  color={card.color}
                  checked={field.value}
                  onChange={field.onChange}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                />
              )}
            />
          ))}
        </div>

        <motion.div 
          className="alert alert-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
          <div>
            <h3 className="font-bold text-sm md:text-base">Information</h3>
            <div className="text-xs md:text-sm">
              Vous pourrez modifier ces préférences à tout moment dans votre profil.
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }, [control]);

  const renderConfirmationStep = useCallback(() => {
    return (
      <motion.div
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-6"
      >
        <FormCard
          title="Confirmation finale"
          description="Vérifiez vos informations avant soumission"
        />
        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-4">Récapitulatif</h3>
          <div className="space-y-2">
            <p><strong>Nom:</strong> {(watch('first_name') || '') + ' ' + (watch('last_name') || '')}</p>
            <p><strong>Email:</strong> {watch('email') || ''}</p>
            <p><strong>Téléphone:</strong> {watch('phone') || ''}</p>
            <p><strong>Adresse:</strong> {(watch('street') || '') + ', ' + (watch('postal_code') || '') + ' ' + (watch('city') || '') + ', ' + (watch('country') || '')}</p>
            <p><strong>Préférences:</strong> 
              {watch('newsletter') ? ' Newsletter,' : ''}
              {watch('offer') ? ' Offres spéciales,' : ''}
              {watch('twoFactorAuth') ? ' Authentification 2FA' : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="btn btn-success w-full mt-4"
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
  }, [handleSubmit, isSubmitting, onSubmit, watch]);

  const stepComponents = {
    PersonalInfoStep: renderPersonalInfoStep,
    AddressStep: renderAddressStep,
    PreferencesStep: renderPreferencesStep,
    ConfirmationStep: renderConfirmationStep
  };

  if (currentStep === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-6 md:py-8">
        <div className="max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-base-100 shadow-xl"
          >
            <div className="card-body p-6 md:p-8">
              <SuccessStep 
                title="Inscription réussie !"
                message="Vous allez être redirigé vers la page d'accueil."
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-6 md:py-8">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-xl"
        >
          <div className="card-body p-6 md:p-8 lg:p-10">
            <StepIndicator steps={stepsConfig} currentStep={currentStep} />

            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {stepsConfig.map((step) => (
                  currentStep === step.number && (
                    <div key={step.number}>
                      {stepComponents[step.component]()}
                    </div>
                  )
                ))}
              </AnimatePresence>

              <FormNavigation
                currentStep={currentStep}
                totalSteps={stepsConfig.length}
                onPrev={prevStep}
                onNext={nextStep}
                isSubmitting={isSubmitting}
              />
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(MultiStepRegistration);
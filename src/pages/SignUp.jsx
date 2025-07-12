import React, { useState, useCallback, memo } from 'react';
import '@styles/signup.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { parsePhoneNumber } from 'react-phone-number-input';
import { User, MapPin, Bell, Shield } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import axiosInstance from '@services/axiosInstance';

// Import des composants étapes
import PersonalInfoStep from '@components/auth/register/steps/PersonalInfoStep';
import AddressStep from '@components/auth/register/steps/AddressStep';
import PreferencesStep from '@components/auth/register/steps/PreferencesStep';
import ConfirmationStep from '@components/auth/register/steps/ConfirmationStep';

// Import des composants partagés
import StepIndicator from '@components/auth/register/StepIndicator';
import FormNavigation from '@components/auth/register/FormNavigation';
import SuccessStep from '@components/auth/register/SuccessStep';

const stepsConfig = [
  { 
    number: 1, 
    title: 'Informations', 
    icon: User, 
    description: 'Données personnelles',
    fields: ['first_name', 'last_name', 'email', 'password', 'confirmPassword', 'phone'],
    component: PersonalInfoStep
  },
  { 
    number: 2, 
    title: 'Adresse', 
    icon: MapPin, 
    description: 'Livraison',
    fields: ['address_name', 'street', 'postal_code', 'city', 'country'],
    component: AddressStep
  },
  { 
    number: 3, 
    title: 'Préférences', 
    icon: Bell, 
    description: 'Personnalisation',
    fields: ['newsletter', 'offer', 'twoFactorAuth'],
    component: PreferencesStep
  },
  { 
    number: 4, 
    title: 'Confirmation', 
    icon: Shield, 
    description: 'Validation finale',
    component: ConfirmationStep
  }
];

// Supprimé car déplacé vers les composants des étapes

const MultiStepRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Le code pays est maintenant géré dans le composant PersonalInfoStep

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


// Configuration des champs déplacée dans les composants des étapes

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
          // La mise à jour du code pays est maintenant gérée dans le composant PersonalInfoStep
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
      setCurrentStep(5);
      setTimeout(() => navigate('/login'), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      toast.error(error.response?.data?.error || 'Erreur lors de l\'inscription');
      setCurrentStep(4);
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate]);

  const currentStepComponent = stepsConfig.find(step => step.number === currentStep)?.component;

  const stepProps = {
    control,
    errors,
    watch,
    isSubmitting,
    profileImage,
    handleImageUpload,
    handlePhoneChange,
    onSubmit: handleSubmit(onSubmit)
  };

  // Les composants d'étapes sont maintenant importés directement

  if (currentStep === 5) {
    return (
      <div className="signup-container">
        <div className="max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="signup-card-body"
          >
            <div className="signup-card-content">
              <SuccessStep 
                message="Bienvenue dans la communauté ! Redirection en cours..."
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="signup-card-body"
        >
          <div className="signup-card-content">
            <StepIndicator steps={stepsConfig} currentStep={currentStep} />

            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {currentStepComponent && (
                  <div key={currentStep} className="w-full">
                    {React.createElement(currentStepComponent, stepProps)}
                  </div>
                )}
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
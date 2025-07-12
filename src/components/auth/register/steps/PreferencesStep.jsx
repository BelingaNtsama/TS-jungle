import { memo } from 'react';
import { motion } from 'framer-motion';
import { Controller } from 'react-hook-form';
import { Bell, Gift, Shield, Sparkles } from 'lucide-react';
import FormCard from '../FormCard';
import PreferenceToggleCard from '../PreferenceToggleCard';

const preferenceCards = [
  {
    name: 'newsletter',
    icon: Bell,
    title: 'Newsletter',
    description: 'Recevez nos dernières actualités et conseils',
    color: 'primary'
  },
  {
    name: 'offer',
    icon: Gift,
    title: 'Offres spéciales',
    description: 'Soyez informé de nos promotions exclusives',
    color: 'secondary'
  },
  {
    name: 'twoFactorAuth',
    icon: Shield,
    title: 'Authentification 2FA',
    description: 'Renforcez la sécurité de votre compte',
    color: 'accent'
  }
];

const stepVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" }},
  exit: { opacity: 0, x: -50, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" }}
};

const PreferencesStep = ({ control }) => {
  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4 md:space-y-6 w-full max-w-4xl mx-auto"
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
                icon={card.icon}
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
        className="alert alert-info shadow-lg"
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
};

export default memo(PreferencesStep);

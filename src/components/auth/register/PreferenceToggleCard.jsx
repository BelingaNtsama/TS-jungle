import React from 'react';
import { motion } from 'framer-motion';

const PreferenceToggleCard = ({ 
  icon: Icon,
  title,
  description,
  color = 'primary',
  checked,
  onChange,
  initial = { opacity: 0, x: -20 },
  animate = { opacity: 1, x: 0 },
  transition = { delay: 0.3 }
}) => {
  const colorClasses = {
    primary: {
      bg: 'from-primary/5 to-primary/10',
      border: 'border-primary/20 hover:border-primary/40',
      iconBg: 'bg-primary/20',
      iconColor: 'text-primary',
      toggle: 'toggle-primary'
    },
    secondary: {
      bg: 'from-secondary/5 to-secondary/10',
      border: 'border-secondary/20 hover:border-secondary/40',
      iconBg: 'bg-secondary/20',
      iconColor: 'text-secondary',
      toggle: 'toggle-secondary'
    },
    accent: {
      bg: 'from-accent/5 to-accent/10',
      border: 'border-accent/20 hover:border-accent/40',
      iconBg: 'bg-accent/20',
      iconColor: 'text-accent',
      toggle: 'toggle-accent'
    }
  };

  return (
    <motion.div 
      className={`card bg-gradient-to-r ${colorClasses[color].bg} border ${colorClasses[color].border} transition-all duration-300`}
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={{ scale: 1.02 }}
    >
      <div className="card-body p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className={`p-2 md:p-3 rounded-xl ${colorClasses[color].iconBg}`}>
              <Icon className={`w-5 h-5 md:w-6 md:h-6 ${colorClasses[color].iconColor}`} />
            </div>
            <div>
              <h3 className="font-semibold text-base-content text-base md:text-lg">{title}</h3>
              <p className="text-xs md:text-sm text-base-content/70">
                {description}
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            className={`toggle ${colorClasses[color].toggle} toggle-sm md:toggle-lg`}
            checked={checked}
            onChange={onChange}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PreferenceToggleCard;
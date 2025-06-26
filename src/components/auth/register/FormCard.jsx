// components/FormCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FormCard = ({ 
  title, 
  description, 
  children, 
  className = '',
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { delay: 0.2 }
}) => (
  <motion.div
    initial={initial}
    animate={animate}
    transition={transition}
    className={`text-center mb-6 md:mb-8 ${className}`}
  >
    <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-1 md:mb-2">
      {title}
    </h2>
    <p className="text-base-content/70 text-sm md:text-lg">
      {description}
    </p>
    {children}
  </motion.div>
);

export default FormCard;
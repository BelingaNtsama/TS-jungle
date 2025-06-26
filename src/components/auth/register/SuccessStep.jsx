import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const SuccessStep = ({ 
  title ,
  message ,
  icon: Icon = Sparkles,
  className = ''
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className={`text-center py-8 md:py-12 ${className}`}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-20 h-20 md:w-24 md:h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6"
    >
      <Check className="w-8 h-8 md:w-12 md:h-12 text-white" />
    </motion.div>
    
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-2xl md:text-3xl font-bold text-success mb-2 md:mb-4"
    >
      {title}
    </motion.h2>
    
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="text-base-content/70 text-base md:text-lg"
    >
      {message}
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-6 md:mt-8"
    >
      <Icon className="w-10 h-10 md:w-12 md:h-12 text-success mx-auto" />
    </motion.div>
  </motion.div>
);

export default SuccessStep;
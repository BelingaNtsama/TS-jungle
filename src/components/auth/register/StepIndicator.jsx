import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

 const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const Icon = step.Icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <div key={step.number}>
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`flex items-center justify-center w-16 h-16 rounded-2xl border-2 mb-3 ${
                    isCompleted 
                      ? 'bg-success border-success text-white shadow-lg' 
                      : isActive 
                      ? 'bg-primary border-primary text-white shadow-lg' 
                      : 'bg-base-100 border-base-300 text-base-content'
                  }`}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    boxShadow: isActive ? "0 10px 25px rgba(0,0,0,0.15)" : "0 4px 6px rgba(0,0,0,0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <Check className="w-8 h-8" />
                  ) : (
                    <Icon className="w-8 h-8" />
                  )}
                </motion.div>
                
                <div className="text-center">
                  <h3 className={`font-semibold text-sm ${
                    isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-base-content/70'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-base-content/50 mt-1">
                    {step.description}
                  </p>
                </div>
              </motion.div>
              
              {index < steps.length - 1 && (
                <motion.div 
                  className={`w-20 h-1 rounded-full ${
                    currentStep > step.number ? 'bg-success' : 'bg-base-300'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: currentStep > step.number ? 1 : 0.3 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FormNavigation = ({ 
  currentStep, 
  totalSteps,
  onPrev, 
  onNext,
  isSubmitting,
  className = ''
}) => (
  <motion.div 
    className={`flex justify-between mt-8 md:mt-12 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
  >
    <button
      type="button"
      onClick={onPrev}
      disabled={currentStep === 1 || isSubmitting}
      className="btn btn-outline btn-primary btn-sm md:btn-lg"
    >
      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
      Précédent
    </button>

    <button
      type="button"
      onClick={onNext}
      disabled={currentStep === 4 || isSubmitting}
      className="btn btn-primary btn-sm md:btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Suivant
      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />
    </button>
  </motion.div>
);

export default FormNavigation;
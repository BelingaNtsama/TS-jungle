import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const PlantModal = ({ plant, onClose }) => {
  return (
    <dialog id="plant_modal" className="modal modal-open">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="modal-box rounded-lg shadow-xl p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{plant.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="h-6 w-6" />
          </button>
        </div>
        <motion.img 
          src={plant.image} 
          alt={plant.name} 
          className="w-full h-64 object-contain rounded-md mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.p 
          className="text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {plant.description || "No description available."}
        </motion.p>
        <div className="modal-action">
          <button
            onClick={onClose}
            className="btn  hover:scale-105 transition-transform"
          >
            Close
          </button>
        </div>
      </motion.div>
    </dialog>
  );
};

export default PlantModal;

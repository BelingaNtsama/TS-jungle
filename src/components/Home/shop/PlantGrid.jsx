import { motion } from 'framer-motion';
import PlantCard from '../../shared/Plant';

const PlantGrid = ({ currentPlants }) => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.15 },
        },
        exit: { opacity: 0, y: -20 },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {currentPlants.length > 0 ? (
        currentPlants.map((plant) => (
          <motion.div
            key={plant.plant.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <PlantCard plant={plant.plant} />
          </motion.div>
        ))
      ) : (
        <motion.p 
          key="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center text-neutral col-span-full"
        >
          Aucune plante trouvée.
        </motion.p>
      )}
    </motion.div>
  );
};

export default PlantGrid;
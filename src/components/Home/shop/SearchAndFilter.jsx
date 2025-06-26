/* eslint-disable react/prop-types */
// components/SearchFilter.jsx
import { motion } from 'framer-motion';

const SearchFilter = ({ 
  filterText, 
  setFilterText, 
  selectedCategory, 
  setSelectedCategory, 
  categories, 
  plants,
  setCurrentPage
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-6 flex flex-col sm:flex-row gap-4 justify-center"
    >
      <label className='input w-full sm:max-w-md input-success'>
        <svg className='h-[1em] opacity-50' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <g strokeLinejoin='round' strokeLinecap='round' strokeWidth='2.5' fill='none' stroke='currentColor'>
            <circle cx='11' cy='11' r='8'/>
            <path d='m21 21-4.3-4.3'/>
          </g>
        </svg>
        <input
          type="search"
          list="plant-names"
          placeholder="Rechercher une plante..."
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            setCurrentPage(1);
          }}
        />
      </label>
      
      <datalist id="plant-names">
        {plants.map((plant) => (
          <option key={plant.plant.id} value={plant.plant.nom} />
        ))}
      </datalist>

      <label className='input w-full sm:max-w-md input-success'>
        <svg className='h-[1em] opacity-50' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <g strokeLinejoin='round' strokeLinecap='round' strokeWidth='2.5' fill='none' stroke='currentColor'>
            <path d='M4 6h16M4 12h16M4 18h16'/>
          </g>
        </svg>
        <input
          type="search"
          list="plant-categories"
          placeholder="Filtrer par catégorie..."
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
        />
      </label>
      
      <datalist id="plant-categories">
        {categories.map((category, index) => (
          <option key={index} value={category} />
        ))}
      </datalist>
    </motion.div>
  );
};

export default SearchFilter;
/* eslint-disable no-unused-vars */
// components/PlantDemo.jsx
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Skeleton from '@components/shared/Skeleton';
import useUIStore from '@stores/plantStore';
import SearchFilter from '@components/Home/shop/SearchAndFilter';
import PlantGrid from '@components/Home/shop/PlantGrid';
import Pagination from '@components/Home/shop/Pagination';

const ITEMS_PER_PAGE = 3;

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchPlants = useUIStore((state) => state.fetchPlants);
  const plants = useUIStore((state) => state.cartItems);

  useEffect(() => {
    fetchPlants().finally(() => setLoading(false));
  }, [fetchPlants]);

  const categories = useMemo(() => 
    [...new Set(plants.map((plant) => plant.plant.category))], 
    [plants]
  );

  const filteredPlants = useMemo(() => 
    plants.filter((plant) => {
      const { name, category } = plant.plant;
      const nameMatch = name.toLowerCase().includes(filterText.toLowerCase());
      return nameMatch && (!selectedCategory || category === selectedCategory);
    }),
    [plants, filterText, selectedCategory]
  );

  const { totalPages, currentPlants } = useMemo(() => {
    const total = Math.ceil(filteredPlants.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return {
      totalPages: total,
      currentPlants: filteredPlants.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    };
  }, [filteredPlants, currentPage]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="p-6 "
    >
      {(plants.length)===0 ? (
        <Skeleton />
      ) : (
        <>
          <SearchFilter
            filterText={filterText}
            setFilterText={setFilterText}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            plants={plants}
            setCurrentPage={setCurrentPage}
          />

          <PlantGrid currentPlants={currentPlants} />

          {filteredPlants.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default Shop;
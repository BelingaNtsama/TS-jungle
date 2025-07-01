import { Header } from '@admin/components/Header';
import  ProductsTable  from '../components/ProductsTable';
import  AddProductModal  from '@admin/components/product-modal';
import { useState } from 'react';

const Products = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div>
      <Header onAddProduct={() => setIsAddModalOpen(true)} />
      <div className="mt-8">
        <ProductsTable />
      </div>
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}

export default Products
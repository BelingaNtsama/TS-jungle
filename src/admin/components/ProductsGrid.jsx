import { ProductCard } from './ProductCard';

const products = [
  {
    name: 'Monstera Deliciosa',
    price: '$49.99',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Snake Plant',
    price: '$29.99',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Fiddle Leaf Fig',
    price: '$59.99',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1597055181300-e7c3c5c9a6a9?auto=format&fit=crop&q=80&w=800'
  }
];

export function ProductsGrid() {
  return (
    <div className="bg-base-100 rounded-box shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Products</h2>
        <button className="btn btn-ghost btn-sm">View All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.nom} product={product} />
        ))}
      </div>
    </div>
  );
}
export function ProductCard({ product }) {
  return (
    <div className="card bg-base-100 border">
      <figure className="px-4 pt-4">
        <img
          src={product.image}
          alt={product.nom}
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{product.nom}</h3>
        <div className="flex justify-between items-center">
          <p className="text-primary font-semibold">{product.prix}</p>
          <p className="text-sm">Stock: {product.stock}</p>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-ghost btn-sm">Edit</button>
          <button className="btn btn-primary btn-sm">View</button>
        </div>
      </div>
    </div>
  );
}
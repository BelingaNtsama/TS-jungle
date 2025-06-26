/* eslint-disable react/prop-types */
import { Plus, Leaf } from 'lucide-react';

export function Header({ onAddProduct }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-plant-100 p-3 rounded-xl">
          <Leaf className="h-8 w-8 text-plant-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-500">Manage your plant inventory</p>
        </div>
      </div>
      <button 
        onClick={onAddProduct}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Add New Plant
      </button>
    </div>
  );
}
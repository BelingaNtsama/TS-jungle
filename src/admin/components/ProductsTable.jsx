/* eslint-disable react/prop-types */
import { useState, useCallback, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AddProductModal } from './AddProductModal';
import { Pencil, Trash2, Box } from 'lucide-react';
import Popup from './popup';
import usePlantStore from '../store/plantStore';


ModuleRegistry.registerModules([AllCommunityModule]);

// Rendus personnalisés mémorisés
const ImageRenderer = ({ value }) => (
  <div className="flex items-center justify-center p-2">
    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-emerald-50 bg-white">
      <img 
        src={value} 
        alt="Product" 
        className="w-full h-full object-cover transform hover:scale-105 transition-transform"
      />
    </div>
  </div>
);

const StockRenderer = ({ value }) => {
  const stockLevel = Math.min(Math.max(value, 0), 100);
  const stockStatus = {
    text: stockLevel > 20 ? 'In Stock' : stockLevel > 0 ? 'Low Stock' : 'Out of Stock',
    color: stockLevel > 20 ? '#10b981' : stockLevel > 0 ? '#f59e0b' : '#ef4444'
  };

  return (
    <div className="flex items-center gap-3">
      <Box className="w-5 h-5" style={{ color: stockStatus.color }} />
      <div className="flex-1">
        <div className="flex justify-between text-sm font-medium mb-1">
          <span>{value} units</span>
          <span>{stockLevel}%</span>
        </div>
        <div className="h-2 bg-emerald-50 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-500 bg-gradient-to-r from-emerald-400 to-emerald-600"
            style={{ width: `${stockLevel}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const StatusRenderer = ({ value }) => {
  const bgClass =
    value === 'In Stock'
      ? 'bg-green-100 text-green-800'
      : value === 'Low Stock'
      ? 'bg-amber-100 text-amber-800'
      : 'bg-red-100 text-red-800';
  const dotClass =
    value === 'In Stock'
      ? 'bg-green-500'
      : value === 'Low Stock'
      ? 'bg-amber-500'
      : 'bg-red-500';

  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${bgClass}`}>
      <span className={`w-2 h-2 rounded-full ${dotClass}`} />
      {value}
    </div>
  );
};

const PriceRenderer = ({ value }) => (
  <span className="font-medium">${value}</span>
);

const ActionRenderer = ({ data, onEditClick, onDeleteClick }) => (
  <div className="flex gap-2">
    <button
      onClick={() => onEditClick(data)}
      className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-all hover:-translate-y-0.5"
    >
      <Pencil className="w-4 h-4" />
      <span className="text-sm font-medium">Edit</span>
    </button>
    <button
      onClick={() => onDeleteClick(data)}
      className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all hover:-translate-y-0.5"
    >
      <Trash2 className="w-4 h-4" />
      <span className="text-sm font-medium">Delete</span>
    </button>
  </div>
);

const gridStyle = `
  .ag-theme-alpine {
    --ag-header-background-color: #f0fdf4;
    --ag-header-foreground-color: #065f46;
    --ag-border-color: #d1fae5;
    --ag-row-hover-color: #f7fee7;
    --ag-font-family: 'Inter', sans-serif;
  }
  
  .ag-header-cell {
    font-weight: 600 !important;
    font-size: 0.9rem;
    border-bottom: 2px solid #a7f3d0 !important;
  }
  
  .ag-cell {
    padding: 16px;
    display: flex;
    align-items: center;
  }
  
  .ag-row {
    transition: all 0.2s ease;
    background: white;
    margin: 4px 0;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.03);
  }
  
  .ag-row:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(13, 148, 103, 0.1);
  }
`;

const ProductsTable = () => {
  const { plants, isLoading, error, fetchPlants } = usePlantStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDeleteClick = useCallback((plant) => {
    setSelectedPlant(plant);
    setIsPopupOpen(true);
  }, []);
  
  useEffect(() => {
    if (plants.length === 0) {
      fetchPlants();
    }
  }, [fetchPlants, plants.length]);

  const handleActionTrigger = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    floatingFilter: true
  }), []);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  // Définition des colonnes, mémorisée pour éviter une recreation inutile
  const columnDefs = useMemo(() => [
    {
      field: 'image',
      headerName: '🖼️ Image',
      cellRenderer: ImageRenderer,
      width: 140,
      filter: false,
      cellClass: 'border-r border-emerald-50'
    },
    {
      field: 'nom',
      headerName: '🌿 Plant Name',
      filter: true,
      flex: 2,
      cellStyle: { fontWeight: '600', color: '#065f46', paddingLeft: '24px' },
      headerClass: 'font-semibold pl-6'
    },
    {
      field: 'categorie',
      headerName: '📦 Category',
      filter: true,
      flex: 1,
      cellRenderer: (params) => (
        <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
          {params.value}
        </span>
      )
    },
    {
      field: 'prix',
      headerName: '💰 Price',
      cellRenderer: PriceRenderer,
      filter: 'agNumberColumnFilter',
      width: 140,
      cellStyle: {
        backgroundColor: '#f0fdf4',
        fontWeight: '700',
        color: '#065f46',
        borderRadius: '8px',
        padding: '8px 12px'
      }
    },
    {
      field: 'stock',
      headerName: '📦 Stock Level',
      filter: 'agNumberColumnFilter',
      width: 240,
      cellRenderer: StockRenderer
    },
    {
      field: 'status',
      headerName: '📈 Status',
      cellRenderer: StatusRenderer,
      width: 200
    },
    {
      field: 'actions',
      headerName: '⚡ Actions',
      cellRenderer: (params) => (
        <ActionRenderer
          data={params.data}
          onEditClick={handleActionTrigger}
          onDeleteClick={handleDeleteClick} // Utilisation de la nouvelle fonction
        />
      ),
      width: 200,
      sortable: false,
      filter: false,
      cellClass: 'border-l border-emerald-50'
    }
  ], [handleActionTrigger, handleDeleteClick])

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <style>{gridStyle}</style>
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">Loading...</div>
      ) : error ? (
        <div className="text-red-500 flex justify-center items-center h-[500px]">{error}</div>
      ) : (
        <div className="ag-theme-alpine w-full h-[500px]">
          <AgGridReact
            rowData={plants}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            animateRows
            rowSelection="multiple"
            pagination
            paginationPageSize={10}
            domLayout="autoHeight"
          />
        </div>
      )}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        product={selectedProduct}
      />
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        selectedRow={selectedPlant}
        close={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default ProductsTable;
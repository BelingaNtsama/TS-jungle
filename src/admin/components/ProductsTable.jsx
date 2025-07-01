import { useEffect, useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Package,
  AlertTriangle,
  CheckCircle,
  Download,
  Plus,
  Copy,
  Archive,
  RefreshCw,
} from 'lucide-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]) 

import useProductsStore from '@admin/stores/plantStore';

// Composant pour l'image avec fallback
const ImageRenderer = ({ value }) => (
  <div className="flex items-center justify-center h-full">
    <img
      src={value}
      alt="Product"
      className="h-12 w-12 object-cover rounded-lg"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://via.placeholder.com/150";
      }}
    />
  </div>
);

// Composant pour le nom du produit avec catégorie
const ProductNameRenderer = ({ data }) => (
  <div className="py-2">
    <div className="font-bold text-gray-900 text-base mb-2">{data.name}</div>
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
        {data.category}
      </span>
    </div>
  </div>
);

// Composant pour le prix
const PriceRenderer = ({ value }) => (
  <div className="flex flex-col items-center space-y-2">
    <div className="flex items-center space-x-2">
      <span className="font-bold text-gray-900 text-lg">${value.toFixed(2)}</span>
    </div>
  </div>
);

// Composant pour le stock avec indicateur visuel
const StockRenderer = ({ value }) => {
  const getStockColor = () => {
    if (value === 0) return 'text-red-600 bg-red-50 border-red-200';
    if (value <= 5) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getStockIcon = () => {
    if (value === 0) return <AlertTriangle className="w-4 h-4" />;
    if (value <= 5) return <Package className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 ${getStockColor()} transition-all duration-200`}
    >
      {getStockIcon()}
      <div>
        <span className="font-bold text-lg">{value}</span>
        <div className="text-xs opacity-75">unités</div>
      </div>
    </motion.div>
  );
};

// Composant pour le statut
const StatusRenderer = ({ value }) => {
  const getStatusStyle = () => {
    switch (value) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 border-green-200 shadow-green-100';
      case 'Low Stock':
        return 'bg-orange-100 text-orange-800 border-orange-200 shadow-orange-100';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 border-red-200 shadow-red-100';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 shadow-gray-100';
    }
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`px-4 py-2 rounded-xl text-sm font-bold border-2 shadow-lg ${getStatusStyle()} transition-all duration-200`}
    >
      {value}
    </motion.span>
  );
};

// Composant pour les ventes
const SalesRenderer = ({ value }) => (
  <div className="text-center space-y-2">
    <div className="flex items-center justify-center space-x-2">
      <Package className="w-5 h-5 text-blue-600" />
      <span className="font-bold text-xl text-gray-900">{value}</span>
    </div>
    <div className="text-xs text-gray-500 mb-2">ventes totales</div>
  </div>
);

// Composant pour les actions
const ActionRenderer = ({ data, onEdit, onDelete, onView, onDuplicate, onArchive }) => {
  const [showMenu, setShowMenu] = useState(false);

  const actions = [
    { icon: Eye, label: 'Voir', action: onView, color: 'text-blue-600 hover:bg-blue-50' },
    { icon: Edit, label: 'Modifier', action: onEdit, color: 'text-green-600 hover:bg-green-50' },
    { icon: Copy, label: 'Dupliquer', action: onDuplicate, color: 'text-purple-600 hover:bg-purple-50' },
    { icon: Archive, label: 'Archiver', action: onArchive, color: 'text-yellow-600 hover:bg-yellow-50' },
    { icon: Trash2, label: 'Supprimer', action: onDelete, color: 'text-red-600 hover:bg-red-50' },
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowMenu(!showMenu)}
        className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <MoreHorizontal className="w-5 h-5 text-gray-600" />
      </motion.button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-20 min-w-[160px] overflow-hidden"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ x: 4 }}
                onClick={() => {
                  action.action(data);
                  setShowMenu(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm flex items-center space-x-3 transition-all duration-200 ${action.color}`}
              >
                <action.icon className="w-4 h-4" />
                <span className="font-medium">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductsTable = () => {
  const {
    products,
    searchText,
    selectedRows,
    isRefreshing,
    setSelectedRows,
    fetchProducts,
    handleEdit,
    handleDelete,
    handleView,
    handleDuplicate,
    handleArchive,
    handleBulkDelete,
    handleRefresh,
  } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [columnDefs] = useState([
    {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 60,
      pinned: 'left',
    },
    {
      field: 'image',
      headerName: 'Image',
      cellRenderer: ImageRenderer,
      width: 100,
      filter: false,
      sortable: false,
      pinned: 'left',
    },
    {
      field: 'name',
      headerName: 'Produit',
      cellRenderer: ProductNameRenderer,
      filter: 'agTextColumnFilter',
      flex: 1,
      minWidth: 280,
      pinned: 'left',
    },
    {
      field: 'price',
      headerName: 'Prix',
      cellRenderer: PriceRenderer,
      filter: 'agNumberColumnFilter',
      width: 150,
      comparator: (valueA, valueB) => valueA - valueB,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      cellRenderer: StockRenderer,
      filter: 'agNumberColumnFilter',
      width: 140,
      comparator: (valueA, valueB) => valueA - valueB,
    },
    {
      field: 'status',
      headerName: 'Statut',
      cellRenderer: StatusRenderer,
      filter: 'agSetColumnFilter',
      width: 150,
    },
    {
      field: 'sales',
      headerName: 'Ventes',
      cellRenderer: SalesRenderer,
      filter: 'agNumberColumnFilter',
      width: 150,
      comparator: (valueA, valueB) => valueA - valueB,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: (params) => (
        <ActionRenderer
          data={params.data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onDuplicate={handleDuplicate}
          onArchive={handleArchive}
        />
      ),
      width: 100,
      sortable: false,
      filter: false,
      pinned: 'right',
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: false,
    }),
    []
  );

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onSelectionChanged = useCallback((event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data.id);
    setSelectedRows(selectedData);
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 via-white to-gray-50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Actualiser</span>
            </motion.button>
            {selectedRows.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBulkDelete(selectedRows)}
                className="px-4 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Trash2 className="w-4 h-4" />
                <span>Supprimer ({selectedRows.length})</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.info('Export en cours...')}
              className="px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Produits</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-2xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">En Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter((p) => p.status === 'In Stock').length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Stock Faible</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter((p) => p.status === 'Low Stock').length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-2xl">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Rupture Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter((p) => p.status === 'Out of Stock').length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="ag-theme-alpine w-full h-[700px]">
        <AgGridReact
          rowData={products}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          animateRows={true}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={10}
          quickFilterText={searchText}
          onSelectionChanged={onSelectionChanged}
          rowHeight={90}
          headerHeight={60}
          suppressMenuHide={true}
          enableCellTextSelection={true}
          ensureDomOrder={true}
          rowClass="hover:bg-gray-50 transition-colors duration-200"
        />
      </div>
    </div>
  );
};

export default ProductsTable;

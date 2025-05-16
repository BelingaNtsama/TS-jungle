import { useState, useCallback, useMemo } from 'react';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);
import { motion, AnimatePresence } from 'framer-motion';
import ImageRenderer from "@/admin/components/shared/ImageRenderer"
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
  RefreshCw
} from 'lucide-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const initialProducts = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    price: 49.99,
    stock: 15,
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
    status: 'In Stock',
    sales: 127,
  },
  {
    id: 2,
    name: 'Snake Plant',
    price: 29.99,
    stock: 3,
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=800',
    status: 'Low Stock',
    sales: 89,
  },
  {
    id: 3,
    name: 'Fiddle Leaf Fig',
    price: 59.99,
    stock: 0,
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1597055181300-e7c3c5c9a6a9?auto=format&fit=crop&q=80&w=800',
    status: 'Out of Stock',
    sales: 156,
  },
  {
    id: 4,
    name: 'Peace Lily',
    price: 34.99,
    stock: 22,
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1586093248219-4b9e5b8b6e8e?auto=format&fit=crop&q=80&w=800',
    status: 'In Stock',
  },
  {
    id: 5,
    name: 'Rubber Plant',
    price: 42.99,
    stock: 8,
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?auto=format&fit=crop&q=80&w=800',
    status: 'In Stock',
    sales: 94,
  }
];

// Modal de confirmation pour les actions
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
      >
        <div className="flex items-center mb-4">
          {type === 'danger' && <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />}
          {type === 'warning' && <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />}
          {type === 'info' && <CheckCircle className="w-6 h-6 text-blue-500 mr-3" />}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
              type === 'danger' ? 'bg-red-600 hover:bg-red-700' :
              type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' :
              'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Confirmer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Toast notification
const Toast = ({ message, type, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-3 ${
        type === 'success' ? 'bg-green-600 text-white' :
        type === 'error' ? 'bg-red-600 text-white' :
        type === 'warning' ? 'bg-yellow-600 text-white' :
        'bg-blue-600 text-white'
      }`}
    >
      {type === 'success' && <CheckCircle className="w-5 h-5" />}
      {type === 'error' && <AlertTriangle className="w-5 h-5" />}
      {type === 'warning' && <AlertTriangle className="w-5 h-5" />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        ×
      </button>
    </motion.div>
  );
};

// Composant pour l'image avec fallback amélioré


// Composant pour le nom du produit avec catégorie amélioré
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

// Composant pour le prix avec tendance amélioré
const PriceRenderer = ({ value, data }) => (
  <div className="flex flex-col items-center space-y-2">
    <div className="flex items-center space-x-2">
      <span className="font-bold text-gray-900 text-lg">${value.toFixed(2)}</span>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`p-1 rounded-ful`}
      >
      </motion.div>
    </div>
  </div>
);

// Composant pour le stock avec indicateur visuel amélioré
const StockRenderer = ({ value, data }) => {
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

// Composant pour le statut amélioré
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

// Composant pour les ventes avec rating amélioré
const SalesRenderer = ({ value, data }) => (
  <div className="text-center space-y-2">
    <div className="flex items-center justify-center space-x-2">
      <Package className="w-5 h-5 text-blue-600" />
      <span className="font-bold text-xl text-gray-900">{value}</span>
    </div>
    <div className="text-xs text-gray-500 mb-2">ventes totales</div>
  </div>
);

// Composant pour les actions amélioré
const ActionRenderer = ({ data, onEdit, onDelete, onView, onDuplicate, onArchive }) => {
  const [showMenu, setShowMenu] = useState(false);

  const actions = [
    { icon: Eye, label: 'Voir', action: onView, color: 'text-blue-600 hover:bg-blue-50' },
    { icon: Edit, label: 'Modifier', action: onEdit, color: 'text-green-600 hover:bg-green-50' },
    { icon: Copy, label: 'Dupliquer', action: onDuplicate, color: 'text-purple-600 hover:bg-purple-50' },
    { icon: Archive, label: 'Archiver', action: onArchive, color: 'text-yellow-600 hover:bg-yellow-50' },
    { icon: Trash2, label: 'Supprimer', action: onDelete, color: 'text-red-600 hover:bg-red-50' }
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
  const [rowData, setRowData] = useState(initialProducts);
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', data: null });
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
    setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
  };

  const handleEdit = (data) => {
    console.log('Modifier le produit:', data);
    showToast(`Modification de "${data.name}" en cours...`, 'info');
    // Simulation d'une modification
    setTimeout(() => {
      setRowData(prev => prev.map(item => 
        item.id === data.id 
          ? { ...item, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      ));
      showToast(`"${data.name}" a été modifié avec succès!`);
    }, 1500);
  };

  const handleDelete = (data) => {
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      data,
      title: 'Supprimer le produit',
      message: `Êtes-vous sûr de vouloir supprimer "${data.name}" ? Cette action est irréversible.`
    });
  };

  const handleView = (data) => {
    console.log('Voir le produit:', data);
    showToast(`Affichage des détails de "${data.name}"`, 'info');
  };

  const handleDuplicate = (data) => {
    const newProduct = {
      ...data,
      id: Math.max(...rowData.map(p => p.id)) + 1,
      name: `${data.name} (Copie)`,
      sku: `${data.sku}-COPY`,
      stock: 0,
      status: 'Out of Stock',
      sales: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setRowData(prev => [...prev, newProduct]);
    showToast(`"${data.name}" a été dupliqué avec succès!`);
  };

  const handleArchive = (data) => {
    setConfirmModal({
      isOpen: true,
      type: 'archive',
      data,
      title: 'Archiver le produit',
      message: `Voulez-vous archiver "${data.name}" ? Il ne sera plus visible dans la liste active.`
    });
  };

  const handleBulkDelete = () => {
    if (selectedRows.length > 0) {
      setConfirmModal({
        isOpen: true,
        type: 'bulkDelete',
        data: selectedRows,
        title: 'Suppression en masse',
        message: `Êtes-vous sûr de vouloir supprimer ${selectedRows.length} produit(s) sélectionné(s) ?`
      });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    showToast('Actualisation des données...', 'info');
    
    // Simulation d'un rechargement
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Données actualisées avec succès!');
    }, 2000);
  };

  const confirmAction = () => {
    const { type, data } = confirmModal;
    
    switch (type) {
      case 'delete':
        setRowData(prev => prev.filter(item => item.id !== data.id));
        showToast(`"${data.name}" a été supprimé avec succès!`);
        break;
      case 'archive':
        setRowData(prev => prev.filter(item => item.id !== data.id));
        showToast(`"${data.name}" a été archivé avec succès!`, 'warning');
        break;
      case 'bulkDelete':
        setRowData(prev => prev.filter(item => !data.includes(item.id)));
        setSelectedRows([]);
        showToast(`${data.length} produit(s) supprimé(s) avec succès!`);
        break;
    }
    
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const handleExport = () => {
    showToast('Export en cours...', 'info');
    setTimeout(() => {
      showToast('Données exportées avec succès!');
    }, 1500);
  };

  const [columnDefs] = useState([
    {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 60,
      pinned: 'left'
    },
    {
      field: 'image',
      headerName: 'Image',
      cellRenderer: ImageRenderer,
      width: 100,
      filter: false,
      sortable: false,
      pinned: 'left'
    },
    {
      field: 'name',
      headerName: 'Produit',
      cellRenderer: ProductNameRenderer,
      filter: 'agTextColumnFilter',
      flex: 1,
      minWidth: 280,
      pinned: 'left'
    },
    {
      field: 'price',
      headerName: 'Prix',
      cellRenderer: PriceRenderer,
      filter: 'agNumberColumnFilter',
      width: 150,
      comparator: (valueA, valueB) => valueA - valueB
    },
    {
      field: 'stock',
      headerName: 'Stock',
      cellRenderer: StockRenderer,
      filter: 'agNumberColumnFilter',
      width: 140,
      comparator: (valueA, valueB) => valueA - valueB
    },
    {
      field: 'status',
      headerName: 'Statut',
      cellRenderer: StatusRenderer,
      filter: 'agSetColumnFilter',
      width: 150
    },
    {
      field: 'sales',
      headerName: 'Ventes & Note',
      cellRenderer: SalesRenderer,
      filter: 'agNumberColumnFilter',
      width: 150,
      comparator: (valueA, valueB) => valueA - valueB
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
      pinned: 'right'
    }
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: false
  }), []);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onSelectionChanged = useCallback((event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data.id);
    setSelectedRows(selectedData);
  }, []);

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header avec actions amélioré */}
        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 via-white to-gray-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            
            <div className="flex flex-col sm:flex-row gap-4">
              
              
              {/* Actions */}
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
                    onClick={handleBulkDelete}
                    className="px-4 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Supprimer ({selectedRows.length})</span>
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExport}
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
        </div>

        {/* Statistiques rapides améliorées */}
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
                  <p className="text-2xl font-bold text-gray-900">{rowData.length}</p>
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
                    {rowData.filter(p => p.status === 'In Stock').length}
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
                    {rowData.filter(p => p.status === 'Low Stock').length}
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
                    {rowData.filter(p => p.status === 'Out of Stock').length}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Table améliorée */}
        <div className="ag-theme-alpine w-full h-[700px]">
          <AgGridReact
            rowData={rowData}
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

      {/* Modal de confirmation */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, type: '', data: null })}
        onConfirm={confirmAction}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type === 'delete' || confirmModal.type === 'bulkDelete' ? 'danger' : 'warning'}
      />

      {/* Toast notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ isVisible: false, message: '', type: 'success' })}
      />
    </>
  );
}

export default ProductsTable
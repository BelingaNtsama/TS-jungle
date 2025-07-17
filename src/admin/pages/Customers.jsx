import { useCallback, useMemo, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Star, 
  ShoppingBag, 
  Download,
  TrendingUp,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import useCustomerStore from '@admin/stores/customerStore';

// Composant pour les informations client avec avatar
const CustomerInfoRenderer = ({ data }) => (
  <div className="flex items-center space-x-3 py-2">
    <div className="relative">
      <img
        src={data.avatar}
        alt={data.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
      />
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
        data.status === 'VIP' ? 'bg-green-400' : 
        data.status === 'Active' ? 'bg-green-400' : 'bg-gray-400'
      }`}></div>
    </div>
    <div>
      <div className="font-semibold text-gray-900">{data.name}</div>
      <div className="text-sm text-gray-500">ID: {data.id}</div>
      {data.status === 'VIP' && (
        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
          <Star className="w-3 h-3 mr-1" />
          VIP Customer
        </div>
      )}
    </div>
  </div>
);

// Composant pour les informations de contact
const ContactRenderer = ({ data }) => (
  <div className="space-y-2 py-1">
    <div className="flex items-center gap-2">
      <Mail className="h-4 w-4 text-gray-400" />
      <a 
        href={`mailto:${data.email}`} 
        className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
      >
        {data.email}
      </a>
    </div>
    <div className="flex items-center gap-2">
      <Phone className="h-4 w-4 text-gray-400" />
      <a 
        href={`tel:${data.phone}`}
        className="text-gray-700 text-sm hover:text-blue-600"
      >
        {data.phone}
      </a>
    </div>
    <div className="flex items-center gap-2">
      <MapPin className="h-4 w-4 text-gray-400" />
      <span className="text-gray-600 text-sm">{data.address || 'Non spécifié'}</span>
    </div>
  </div>
);

// Composant pour les statistiques de commandes
const OrderStatsRenderer = ({ data }) => (
  <div className="text-center space-y-2">
    <div className="flex items-center justify-center space-x-2">
      <ShoppingBag className="w-4 h-4 text-blue-600" />
      <span className="font-bold text-lg text-gray-900">{data.orders}</span>
    </div>
    <div className="text-xs text-gray-500">Total Orders</div>
    <div className="flex items-center justify-center space-x-1">
      <Star className="w-3 h-3 text-yellow-400 fill-current" />
      <span className="text-sm font-medium text-gray-700">{data.rating || 4.5}</span>
    </div>
  </div>
);


// Composant pour les dates
const DateRenderer = ({ value, data }) => {
  const lastOrderDate = data.lastOrder ? new Date(data.lastOrder) : null;
  const joinDate = new Date(data.joinDate);
  const now = new Date();
  
  const daysSinceLastOrder = lastOrderDate 
    ? Math.floor((now - lastOrderDate) / (1000 * 60 * 60 * 24))
    : null;
  
  return (
    <div className="space-y-2">
      {lastOrderDate && (
        <div>
          <div className="text-sm font-medium text-gray-900">Dernière commande</div>
          <div className="text-xs text-gray-600">{lastOrderDate.toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">
            {daysSinceLastOrder === 0 ? "Aujourd'hui" : 
             daysSinceLastOrder === 1 ? 'Hier' : 
             `${daysSinceLastOrder} jours`}
          </div>
        </div>
      )}
      <div>
        <div className="text-sm font-medium text-gray-900">Inscription</div>
        <div className="text-xs text-gray-600">{joinDate.toLocaleDateString()}</div>
      </div>
    </div>
  );
};

const Customers = () => {
  const {
    customers,
    loading,
    error,
    stats,
    fetchCustomers,
    exportCustomers
  } = useCustomerStore();

  const [columnDefs] = useState([
    {
      field: 'name',
      headerName: 'Client',
      cellRenderer: CustomerInfoRenderer,
      filter: 'agTextColumnFilter',
      flex: 1,
      minWidth: 350,
      pinned: 'left'
    },
    {
      headerName: 'Coordonnées',
      cellRenderer: ContactRenderer,
      filter: false,
      sortable: false,
      flex: 1.5,
      minWidth: 220
    },
    {
      field: 'orders',
      headerName: 'Commandes',
      cellRenderer: OrderStatsRenderer,
      filter: 'agNumberColumnFilter',
      width: 140,
      comparator: (valueA, valueB) => valueA - valueB
    },
    {
      field: 'lastOrder',
      headerName: 'Activité',
      cellRenderer: DateRenderer,
      filter: 'agDateColumnFilter',
      width: 150,
      comparator: (valueA, valueB) => {
        if (!valueA && !valueB) return 0;
        if (!valueA) return 1;
        if (!valueB) return -1;
        return new Date(valueA) - new Date(valueB);
      }
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

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleExport = async () => {
    try {
      await exportCustomers();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  // Calcul des variations pour les indicateurs
  const growthRate = {
    customers: 12, // Exemple: 12% de croissance
    revenue: 8,    // Exemple: 8% de croissance
    avgOrder: -3   // Exemple: 3% de baisse
  };

  if (loading) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center h-64"
    >
      <div className="loading loading-spinner loading-lg"></div>
    </motion.div>
  );

  if (error) return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="alert alert-error shadow-lg max-w-2xl mx-auto mt-8"
    >
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Erreur lors du chargement des clients: {error}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header similaire à Products.jsx */}
      <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 via-white to-gray-50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold">Gestion des clients</h1>
          <p className="text-base-content/70">Visualisez et gérez tous vos clients</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExport}
          className="px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          disabled={loading}
        >
          <Download className="h-4 w-4" />
          <span>Exporter</span>
        </motion.button>
      </div>

      {/* Cartes de statistiques animées */}
      <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <div className={`flex items-center gap-1 ${growthRate.customers > 0 ? 'text-success' : 'text-error'}`}>
                  {growthRate.customers > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingUp className="h-4 w-4 transform rotate-180" />
                  )}
                  <span className="text-sm">{Math.abs(growthRate.customers)}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-2xl">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Clients actifs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">+{Math.floor(stats.active / stats.total * 100)}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-2xl">
                <Star className="w-6 h-6 text-yellow-600 fill-current" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Clients VIP</p>
                <p className="text-2xl font-bold text-gray-900">{stats.vip}</p>
                <div className="flex items-center gap-1 text-warning">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">+{Math.floor(stats.vip / stats.total * 100)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tableau AG Grid animé */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ag-theme-alpine w-full h-[600px] rounded-lg overflow-hidden"
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          rowHeight={90}
          headerHeight={50}
          suppressMenuHide={true}
          enableCellTextSelection={true}
          ensureDomOrder={true}
          overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Chargement des données...</span>'}
          overlayNoRowsTemplate={'<span class="ag-overlay-loading-center">Aucun client trouvé</span>'}
        />
      </motion.div>
    </div>
  );
}

export default Customers;
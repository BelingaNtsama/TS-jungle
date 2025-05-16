import { useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([ AllCommunityModule ])


import { 
  Eye, 
  Edit, 
  Truck, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  MoreHorizontal,
  MapPin,
  User,
  CreditCard
} from 'lucide-react';

const orders = [
  {
    id: '#ORD-2024-001',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    product: 'Monstera Deliciosa',
    products: ['Monstera Deliciosa', 'Care Kit'],
    total: 49.99,
    status: 'Delivered',
    priority: 'Normal',
    date: '2024-03-20',
    shippingAddress: 'New York, NY',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456789'
  },
  {
    id: '#ORD-2024-002',
    customer: 'Jane Smith',
    customerEmail: 'jane@example.com',
    product: 'Snake Plant',
    products: ['Snake Plant'],
    total: 29.99,
    status: 'Processing',
    priority: 'High',
    date: '2024-03-20',
    shippingAddress: 'Los Angeles, CA',
    paymentMethod: 'PayPal',
    trackingNumber: 'TRK123456790'
  },
  {
    id: '#ORD-2024-003',
    customer: 'Robert Johnson',
    customerEmail: 'robert@example.com',
    product: 'Fiddle Leaf Fig',
    products: ['Fiddle Leaf Fig', 'Fertilizer'],
    total: 59.99,
    status: 'Canceling',
    priority: 'Normal',
    date: '2024-03-19',
    shippingAddress: 'Chicago, IL',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456791'
  },
  {
    id: '#ORD-2024-004',
    customer: 'Emily Davis',
    customerEmail: 'emily@example.com',
    product: 'Peace Lily',
    products: ['Peace Lily', 'Decorative Pot'],
    total: 44.99,
    status: 'Shipped',
    priority: 'Normal',
    date: '2024-03-18',
    shippingAddress: 'Miami, FL',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456792'
  },
  {
    id: '#ORD-2024-005',
    customer: 'Michael Brown',
    customerEmail: 'michael@example.com',
    product: 'Rubber Plant',
    products: ['Rubber Plant'],
    total: 42.99,
    status: 'Cancelled',
    priority: 'Low',
    date: '2024-03-17',
    shippingAddress: 'Seattle, WA',
    paymentMethod: 'Credit Card',
    trackingNumber: null
  }
];

// Composant pour l'ID de commande
const OrderIdRenderer = ({ value, data }) => (
  <div className="font-mono text-sm">
    <div className="font-semibold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500 mt-1">
      {data.trackingNumber || 'No tracking'}
    </div>
  </div>
);

// Composant pour les informations client
const CustomerRenderer = ({ data }) => (
  <div className="py-1">
    <div className="flex items-center space-x-2 mb-1">
      <User className="w-4 h-4 text-gray-400" />
      <span className="font-medium text-gray-900 text-sm">{data.customer}</span>
    </div>
    <div className="text-xs text-gray-500">{data.customerEmail}</div>
    <div className="flex items-center space-x-1 mt-1">
      <MapPin className="w-3 h-3 text-gray-400" />
      <span className="text-xs text-gray-500">{data.shippingAddress}</span>
    </div>
  </div>
);

// Composant pour les produits
const ProductsRenderer = ({ data }) => (
  <div className="py-1">
    <div className="font-medium text-gray-900 text-sm mb-1">{data.product}</div>
    {data.products.length > 1 && (
      <div className="text-xs text-gray-500">
        +{data.products.length - 1} more item{data.products.length > 2 ? 's' : ''}
      </div>
    )}
  </div>
);

// Composant pour le prix avec méthode de paiement
const PriceRenderer = ({ value, data }) => (
  <div className="text-right">
    <div className="font-bold text-gray-900">${value.toFixed(2)}</div>
    <div className="flex items-center justify-end space-x-1 mt-1">
      <CreditCard className="w-3 h-3 text-gray-400" />
      <span className="text-xs text-gray-500">{data.paymentMethod}</span>
    </div>
  </div>
);

// Composant pour le statut avec priorité
const StatusRenderer = ({ value, data }) => {
  const getStatusStyle = () => {
    switch (value) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Canceling':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (value) {
      case 'Delivered':
        return <CheckCircle className="w-3 h-3" />;
      case 'Shipped':
        return <Truck className="w-3 h-3" />;
      case 'Processing':
        return <Package className="w-3 h-3" />;
      case 'Canceling':
        return <Clock className="w-3 h-3" />;
      case 'Cancelled':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getPriorityColor = () => {
    switch (data.priority) {
      case 'High':
        return 'bg-red-500';
      case 'Normal':
        return 'bg-blue-500';
      case 'Low':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-2">
      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle()}`}>
        {getStatusIcon()}
        <span>{value}</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${getPriorityColor()}`}></div>
        <span className="text-xs text-gray-500">{data.priority} Priority</span>
      </div>
    </div>
  );
};

// Composant pour la date
const DateRenderer = ({ value }) => {
  const date = new Date(value);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return (
    <div className="text-sm">
      <div className="font-medium text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">
        {diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`}
      </div>
    </div>
  );
};

// Composant pour les actions
const ActionRenderer = ({ data, onView, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
      >
        <MoreHorizontal className="w-4 h-4 text-gray-600" />
      </button>
      
      {showMenu && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
          <button
            onClick={() => {
              onView(data);
              setShowMenu(false);
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-gray-700"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
          <button
            onClick={() => {
              onEdit(data);
              setShowMenu(false);
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-blue-600"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Order</span>
          </button>
          {data.trackingNumber && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(data.trackingNumber);
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-green-600"
            >
              <Truck className="w-4 h-4" />
              <span>Copy Tracking</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const Orders = () => {
  const handleView = (data) => {
    console.log('View order:', data);
  };

  const handleEdit = (data) => {
    console.log('Edit order:', data);
  };

  const handleExport = () => {
    console.log('Export orders');
  };

  const [columnDefs] = useState([
    {
      field: 'id',
      headerName: 'Order ID',
      cellRenderer: OrderIdRenderer,
      filter: 'agTextColumnFilter',
      width: 150,
      pinned: 'left'
    },
    {
      field: 'customer',
      headerName: 'Customer',
      cellRenderer: CustomerRenderer,
      filter: 'agTextColumnFilter',
      flex: 1,
      minWidth: 250
    },
    {
      field: 'product',
      headerName: 'Products',
      cellRenderer: ProductsRenderer,
      filter: 'agTextColumnFilter',
      flex: 1,
      minWidth: 200
    },
    {
      field: 'total',
      headerName: 'Total & Payment',
      cellRenderer: PriceRenderer,
      filter: 'agNumberColumnFilter',
      width: 150,
      comparator: (valueA, valueB) => valueA - valueB
    },
    {
      field: 'status',
      headerName: 'Status & Priority',
      cellRenderer: StatusRenderer,
      filter: 'agSetColumnFilter',
      width: 180
    },
    {
      field: 'date',
      headerName: 'Order Date',
      cellRenderer: DateRenderer,
      filter: 'agDateColumnFilter',
      width: 130,
      comparator: (valueA, valueB) => new Date(valueA) - new Date(valueB)
    },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: (params) => (
        <ActionRenderer
          data={params.data}
          onView={handleView}
          onEdit={handleEdit}
        />
      ),
      width: 80,
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


  // Statistiques des commandes
  const stats = useMemo(() => {
    const total = orders.length;
    const delivered = orders.filter(o => o.status === 'Delivered').length;
    const processing = orders.filter(o => o.status === 'Processing').length;
    const Canceling = orders.filter(o => o.status === 'Canceling').length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    
    return { total, delivered, processing, Canceling, totalRevenue };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-500">Track and manage customer orders</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header avec actions */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">      
            
            {/* Actions */}
            <div className="flex justify-between w-full">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200">
                <h2 className='text-xl'>Tableau des commandes</h2>
              </button>
              
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg
                 hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivered</p>
                  <p className="text-xl font-bold text-gray-900">{stats.delivered}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Processing</p>
                  <p className="text-xl font-bold text-gray-900">{stats.processing}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Canceling</p>
                  <p className="text-xl font-bold text-gray-900">{stats.Canceling}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="ag-theme-alpine w-full h-[600px]">
          <AgGridReact
            rowData={orders}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            animateRows={true}
            pagination={true}
            paginationPageSize={10}
            rowHeight={80}
            headerHeight={50}
            suppressMenuHide={true}
            enableCellTextSelection={true}
            ensureDomOrder={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Orders
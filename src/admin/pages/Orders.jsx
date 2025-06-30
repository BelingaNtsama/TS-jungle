import { useState, useCallback, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import  useOrderStore from '@/admin/stores/orderStore';
import { provideGlobalGridOptions } from 'ag-grid-community';

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });

import { 
  Eye, Edit, Truck, Package, CheckCircle, 
  Clock, AlertCircle, Download, MoreHorizontal, 
  MapPin, User, CreditCard 
} from 'lucide-react';

  
// Composants de rendu personnalisés
const OrderIdRenderer = ({ value, data }) => (
  <div className="font-mono text-sm">
    <div className="font-semibold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500 mt-1">
      {data.trackingNumber || 'No tracking'}
    </div>
  </div>
);

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

const PriceRenderer = ({ value, data }) => (
  <div className="text-right">
    <div className="font-bold text-gray-900">${value.toFixed(2)}</div>
    <div className="flex items-center justify-end space-x-1 mt-1">
      <CreditCard className="w-3 h-3 text-gray-400" />
      <span className="text-xs text-gray-500">{data.paymentMethod}</span>
    </div>
  </div>
);

const StatusRenderer = ({ value, data }) => {
  const statusConfig = {
    Delivered: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', icon: CheckCircle },
    Shipped: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', icon: Truck },
    Processing: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', icon: Package },
    Canceling: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', icon: Clock },
    Cancelled: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: AlertCircle }
  };

  const priorityColors = {
    High: 'bg-red-500',
    Normal: 'bg-blue-500',
    Low: 'bg-gray-500'
  };

  const config = statusConfig[value] || { 
    bg: 'bg-gray-100', 
    text: 'text-gray-800', 
    border: 'border-gray-200', 
    icon: Clock 
  };
  const Icon = config.icon;
  const priorityColor = priorityColors[data.priority] || 'bg-gray-500';

  return (
    <div className="space-y-2">
      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border}`}>
        <Icon className="w-3 h-3" />
        <span>{value}</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${priorityColor}`}></div>
        <span className="text-xs text-gray-500">{data.priority} Priority</span>
      </div>
    </div>
  );
};

const DateRenderer = ({ value }) => {
  const date = new Date(value);
  const now = new Date();
  const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="text-sm">
      <div className="font-medium text-gray-900">{new Date(value).toLocaleDateString()}</div>
      <div className="text-xs text-gray-500">
        {diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`}
      </div>
    </div>
  );
};

const ActionRenderer = ({ data, api }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { updateOrder } = useOrderStore();

  const handleAction = async (action) => {
    setShowMenu(false);
    
    switch (action) {
      case 'view':
        console.log('View order:', data);
        break;
      case 'edit':
        console.log('Edit order:', data);
        break;
      case 'mark-delivered':
        await updateOrder(data.id, { status: 'Delivered' });
        break;
      case 'copy-tracking':
        if (data.trackingNumber) {
          navigator.clipboard.writeText(data.trackingNumber);
        }
        break;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
      >
        <MoreHorizontal className="w-4 h-4 text-gray-600" />
      </button>
      
      {showMenu && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
          <button
            onClick={() => handleAction('view')}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-gray-700"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
          <button
            onClick={() => handleAction('edit')}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-blue-600"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Order</span>
          </button>
          {data.status !== 'Delivered' && (
            <button
              onClick={() => handleAction('mark-delivered')}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-green-600"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark Delivered</span>
            </button>
          )}
          {data.trackingNumber && (
            <button
              onClick={() => handleAction('copy-tracking')}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-purple-600"
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
  const [gridApi, setGridApi] = useState(null);
 const { orders, loading, error, stats, fetchOrders } = useOrderStore();
  
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  

  const handleExport = useCallback(() => {
    if (gridApi) {
      gridApi.exportDataAsCsv({
        fileName: `orders_${new Date().toISOString().slice(0, 10)}.csv`,
        columnKeys: ['id', 'customer', 'product', 'total', 'status', 'date']
      });
    }
  }, [gridApi]);

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
      cellRenderer: ActionRenderer,
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
    floatingFilter: false,
    suppressMovable: true
  }), []);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }, []);

  if (loading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Failed to load orders: {error}
            </p>
            <button
              onClick={fetchOrders}
              className="mt-2 text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-500">Track and manage customer orders</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">      
            <div className="flex justify-between w-full">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200">
                <h2 className='text-xl'>Tableau des commandes</h2>
              </button>
              
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { 
                label: 'Total Orders', 
                value: stats.total, 
                icon: Package, 
                color: 'blue' 
              },
              { 
                label: 'Delivered', 
                value: stats.delivered, 
                icon: CheckCircle, 
                color: 'green' 
              },
              { 
                label: 'Processing', 
                value: stats.processing, 
                icon: Clock, 
                color: 'yellow' 
              },
              { 
                label: 'Canceling', 
                value: stats.canceling, 
                icon: AlertCircle, 
                color: 'orange' 
              },
              { 
                label: 'Revenue', 
                value: `$${stats.totalRevenue.toFixed(2)}`, 
                icon: CreditCard, 
                color: 'purple' 
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
            loadingOverlayComponent={() => (
              <div className="ag-custom-loading-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
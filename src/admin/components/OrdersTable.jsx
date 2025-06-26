import { Filter } from 'lucide-react';

const orders = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    product: 'Monstera Deliciosa',
    amount: '$49.99',
    status: 'completed',
    date: '2024-03-20'
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    product: 'Snake Plant',
    amount: '$29.99',
    status: 'processing',
    date: '2024-03-20'
  },
  {
    id: '#ORD-003',
    customer: 'Robert Johnson',
    product: 'Fiddle Leaf Fig',
    amount: '$59.99',
    status: 'pending',
    date: '2024-03-19'
  }
];

export function OrdersTable() {
  return (
    <div className="bg-base-100 rounded-box shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <div className="flex gap-2">
          <button className="btn btn-ghost btn-sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="btn btn-ghost btn-sm">View All</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.amount}</td>
                <td>
                  <div className={`badge ${
                    order.status === 'completed' ? 'badge-success' :
                    order.status === 'processing' ? 'badge-warning' :
                    'badge-ghost'
                  } gap-2`}>
                    {order.status}
                  </div>
                </td>
                <td>{order.date}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
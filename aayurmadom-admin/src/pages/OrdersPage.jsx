import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../api/adminApi';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const response = await getOrders();
    setOrders(response.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const changeStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    loadOrders();
  };

  return (
    <div>
      <h1 className="page-title">Orders Management</h1>

      {orders.length === 0 ? (
        <div className="card">
          <p>No orders found.</p>
        </div>
      ) : (
        orders.map(order => (
          <div key={order.id} className="card">
            <span className="badge">Order #{order.id}</span>

            <h3>{order.productName}</h3>

            <p>User: {order.userEmail}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Price: ₹{order.price}</p>
            <p>Total: ₹{order.totalPrice}</p>

            <p>
  Status:{' '}
  <span className={`status-badge status-${order.status?.toLowerCase()}`}>
    {order.status}
  </span>
</p>

            <div>
              <button
                className="btn btn-gold"
                onClick={() => changeStatus(order.id, 'PROCESSING')}
              >
                Processing
              </button>

              <button
                className="btn btn-green"
                onClick={() => changeStatus(order.id, 'SHIPPED')}
              >
                Shipped
              </button>

              <button
                className="btn btn-green"
                onClick={() => changeStatus(order.id, 'DELIVERED')}
              >
                Delivered
              </button>

              <button
                className="btn btn-red"
                onClick={() => changeStatus(order.id, 'CANCELLED')}
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
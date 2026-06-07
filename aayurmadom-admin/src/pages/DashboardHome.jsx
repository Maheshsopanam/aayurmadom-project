import { useEffect, useState } from 'react';
import { getProducts, getOrders, getConsultations } from '../api/adminApi';

export default function DashboardHome() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    consultations: 0,
    pendingConsultations: 0,
    revenue: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const productsRes = await getProducts();
    const ordersRes = await getOrders();
    const consultationsRes = await getConsultations();

    const orders = ordersRes.data;
    const consultations = consultationsRes.data;

    const revenue = orders.reduce(
      (total, order) => total + Number(order.totalPrice || 0),
      0
    );

    const pendingConsultations = consultations.filter(
      item => item.status === 'PENDING'
    ).length;

    setStats({
      products: productsRes.data.length,
      orders: orders.length,
      consultations: consultations.length,
      pendingConsultations,
      revenue,
    });
  };

  return (
    <div>
      <h1 className="page-title">Dashboard Overview</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Products</p>
          <h2>{stats.products}</h2>
        </div>

        <div className="stat-card">
          <p>Total Orders</p>
          <h2>{stats.orders}</h2>
        </div>

        <div className="stat-card">
          <p>Total Consultations</p>
          <h2>{stats.consultations}</h2>
        </div>

        <div className="stat-card">
          <p>Pending Consultations</p>
          <h2>{stats.pendingConsultations}</h2>
        </div>

        <div className="stat-card revenue-card">
          <p>Total Revenue</p>
          <h2>₹{stats.revenue}</h2>
        </div>
      </div>
    </div>
  );
}
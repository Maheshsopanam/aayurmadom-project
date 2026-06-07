import { NavLink, Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Aayurmadom Admin</h2>

        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/consultations">Consultations</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
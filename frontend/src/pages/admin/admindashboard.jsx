import React from 'react';
import './dashboards.css';
import { Link } from "react-router-dom";


function AdminDashboard() {
  return (
    <div className="dashboard-layout">
      {}
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav className="sidebar-nav">
        <ul>
  <li><Link to="/admin/AdminDashboard">🏠 Dashboard</Link></li>
                        <li><Link to="/admin/AddEmployee">👷 Add Employee</Link></li>
                                                            <li><Link to="/admin/ManageEmployees">📋 Manage Employees</Link></li>
                                                            <li><Link to="/admin/ManagePayments">📅 Manage Payments</Link></li>
                                                            <li><Link to="/admin/AddPayment">📅 Add Payments</Link></li>
                                                            <li><Link to="/admin/ManageSchedule">📅 Manage Schedule</Link></li>
                                                            <li><Link to="/admin/payments">💰 Manage Payments</Link></li>
                                                            <li><Link to="/">🚪 Logout</Link></li>
</ul>

        </nav>
      </aside>

      {}
      <main className="dashboard-main2">
        <header className="dashboard-header">
          <h1>Welcome to Admin Dashboard</h1>
          <p className="dashboard-intro">Quick overview of employees, sites, and payments.</p>
        </header>

        <section className="dashboard-content">
          <div className="dashboard-grid">
            {}
            <div className="dashboard-card">
              <h3>👷 Manage Employees</h3>
              <h5 class="para">View, add, update, and remove employee details.</h5>
              <button className="dashboard-btn"><Link to="/admin/ManageEmployees">Go to Employees</Link></button>
            </div>

            {}
            <div className="dashboard-card">
              <h3>📅 Manage Schedule</h3>
              <h5>Assign and update employee schedules efficiently.</h5>
              <button className="dashboard-btn"><Link to="/admin/ManageSchedule">Manage Schedule</Link></button>
            </div>

            {}
            <div className="dashboard-card">
              <h3>💰 Manage Payments</h3>
              <h5>Track salaries, generate reports and make payments.</h5>
              <button className="dashboard-btn"><Link to="/admin/ManagePayments">Go to Payments</Link></button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;

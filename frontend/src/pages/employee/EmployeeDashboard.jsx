import React from "react";
import { Link } from "react-router-dom";
import "./employeeDashboard.css";

function EmployeeDashboard() {
  return (
    <div className="employee-dashboard">
      <aside className="employee-sidebar">
        <h2 className="sidebar-title">Employee Panel</h2>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/employee/EmployeeDashboard">🏠 Dashboard</Link></li>
            <li><Link to="/employee/ViewPayments">💰 View Payments</Link></li>
            <li><Link to="/employee/EmployeeSchedule">📅 View Schedules</Link></li>
            <li><Link to="/">🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="employee-main">
        <header className="employee-header">
          <h1>Welcome Back!</h1>
          <p className="employee-intro">Here’s your overview and quick access to your information.</p>
        </header>

        <section className="employee-widgets">
          <div className="widget-card">
            <h3>Total Payments Received</h3>
            <p>£10,000</p> {}
          </div>
          <div className="widget-card">
            <h3>Next Scheduled Shift</h3>
            <p>Night Shift - 10 PM (May 10, 2025)</p> {}
          </div>
        </section>
      </main>
    </div>
  );
}

export default EmployeeDashboard;

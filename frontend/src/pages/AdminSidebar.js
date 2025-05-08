import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../employee/Header"; // shared header
import "./layout.css";

const AdminSidebar = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <aside className="sidebar">
          <nav className="nav-links">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/employees">Manage Employees</Link>
            <Link to="/admin/sites">Manage Sites</Link>
            <Link to="/admin/payments">Manage Payments</Link>
            <Link to="/admin/reports">Reports</Link>
          </nav>
        </aside>
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/sites">Sites</Link>
        <Link to="/payments">Payments</Link>
        <Link to="/logout">Logout</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

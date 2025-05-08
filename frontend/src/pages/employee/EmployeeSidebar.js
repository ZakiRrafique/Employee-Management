import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import "./layout.css";

const EmployeeSidebar = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <aside className="sidebar">
          <nav className="nav-links">
            <Link to="/employee/dashboard">Dashboard</Link>
            <Link to="/employee/assigned-sites">Assigned Sites</Link>
            {/* <Link to="/employee/timesheet">Timesheet</Link> */}
            <Link to="/employee/payments">My Payments</Link>
            <Link to="/employee/notifications">Notifications</Link>
          </nav>
        </aside>
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeSidebar;

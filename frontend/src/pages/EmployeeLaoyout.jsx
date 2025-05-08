import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import EmployeeSidebar from "./EmployeeSidebar";

const EmployeeLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-layout">
        <EmployeeSidebar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;

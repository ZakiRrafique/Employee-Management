// src/components/Layout.js
import React from 'react';
import Header from './Header';
import AdminSidebar from './AdminSidebar'; // or choose based on user
import './layout.css'; // if needed

const Layout = ({ children, userType }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main">
        {userType === 'admin' ? <AdminSidebar /> : <></>}
        {/* You can also render EmployeeSidebar here for employee */}
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

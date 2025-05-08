import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './layout.css';

function Layout({ title, children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Header title={title} />
        <section className="dashboard-content">
          {children}
        </section>
      </main>
    </div>
  );
}

export default Layout;

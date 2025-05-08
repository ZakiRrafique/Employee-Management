import React from 'react';
import './layout.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Employee Panel</h2>
      <nav className="sidebar-nav">
        <ul>
          <li>🏠 Dashboard</li>
          <li>📅 Schedule</li>
          <li>⏱ Hours</li>
          <li>💰 Payments</li>
          <li>⚙️ Settings</li>
          <li>🚪 Logout</li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

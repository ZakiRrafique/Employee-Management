import React from 'react';
import './layout.css';

function Header({ title }) {
  return (
    <header className="dashboard-header">
      <h1>{title}</h1>
    </header>
  );
}

export default Header;

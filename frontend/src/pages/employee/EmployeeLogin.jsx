import React, { useState } from 'react';
import './page.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeLogin() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/backend/employee-login', {
        employeeId,
        password,
      });

      if (response.data.success) {
        navigate('/employee/EmployeeDashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError('Login error. Please try again.');
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">Employee Portal</h2>
        <nav className="sidebar-nav">
          <ul>
            <li><a href="/">🏠 Home</a></li>
            <li><a href="/admin/AdminLogin">🔐 Admin Login</a></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-mains">
        <header className="dashboard-header">
          <h1>Employee Login</h1>
          <p className="dashboard-intro">Log in to access your schedule and payment information.</p>
        </header>

        <section className="dashboard-content">
          <div className="card">
            <h3 className="card-title">Login</h3>
            <form onSubmit={handleLogin} className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="btn-primary">Login</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default EmployeeLogin;

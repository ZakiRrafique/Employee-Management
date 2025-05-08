import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './addpayment.css';
import { Link } from "react-router-dom";

function AddPayment() {
  const [formData, setFormData] = useState({
    employeeId: '',
    amount: '',
    paymentDate: '',
    paymentMethod: ''
  });
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/backend/employees")
      .then(response => setEmployees(response.data))
      .catch(err => console.error("Error fetching employees:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://127.0.0.1:5000/backend/payments", formData, {
      headers: { "Content-Type": "application/json" }
    })
    .then(() => {
      setMessage("✅ Payment added successfully!");
      setFormData({ employeeId: '', amount: '', paymentDate: '', paymentMethod: '' });
    })
    .catch(() => setMessage("❌ Failed to add payment."));

    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/admin/AdminDashboard">🏠 Dashboard</Link></li>
            <li><Link to="/admin/AddEmployee">👷 Add Employee</Link></li>
            <li><Link to="/admin/ManageEmployees">📋 Manage Employees</Link></li>
            <li><Link to="/admin/AddSchedule">🗓 Add Schedule</Link></li>
            <li><Link to="/admin/ManageSchedule">📅 Manage Schedule</Link></li>
            <li><Link to="/admin/AddPayment">💰 Add Payment</Link></li>
            <li><Link to="/">🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Add Payment</h1>
          <p className="dashboard-intro">Record a payment made to an employee.</p>
        </header>

        <section className="dashboard-content">
          <form onSubmit={handleSubmit} className="form-card">
            <select name="employeeId" value={formData.employeeId} onChange={handleChange} required>
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              required
            />

            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
              <option value="">Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cheque">Cheque</option>
            </select>

            <button type="submit" className="submit-btn">Add Payment</button>
          </form>

          {message && (
            <p className={`feedback-msg ${message.includes("❌") ? "error" : "success"}`}>
              {message}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default AddPayment;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './addschedule.css';

function AddSchedule() {
  const [formData, setFormData] = useState({
    employeeName: '',
    assignedSite: '',
    scheduledTime: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [employees, setEmployees] = useState([]);

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

    axios.post("http://127.0.0.1:5000/backend/schedule", formData, {
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        setSuccessMessage("✅ Schedule added successfully!");
        setFormData({ employeeName: "", assignedSite: "", scheduledTime: "" });
      })
      .catch(err => {
        console.error("Error:", err);
        setSuccessMessage("❌ Failed to add schedule.");
      });

    setTimeout(() => setSuccessMessage(""), 5000);
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
                        
                        <li><Link to="/admin/ManageSchedule">📅 Manage Schedule</Link></li>
                        <li><Link to="/admin/payments">💰 Manage Payments</Link></li>
                        <li><Link to="/">🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Add Schedule</h1>
          <p className="dashboard-intro">Assign an employee to a site and time.</p>
        </header>

        <section className="dashboard-content">
          <form onSubmit={handleSubmit} className="form-card">
            <select
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.name}>{emp.name}</option>
              ))}
            </select>
            <input
              type="text"
              name="assignedSite"
              placeholder="Assigned Site"
              value={formData.assignedSite}
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="scheduledTime"
              value={formData.scheduledTime}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn">Add Schedule</button>
          </form>

          {successMessage && (
            <p className={`feedback-msg ${successMessage.includes("❌") ? "error" : "success"}`}>
              {successMessage}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default AddSchedule;

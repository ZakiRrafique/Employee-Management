import React, { useState } from 'react';
import axios from 'axios';
import './addemployee.css';

import { Link } from "react-router-dom";

function AddEmployee() {
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      assignedSite: "",
      schedule_shift: "",     
      schedule_time: ""      
    });
    
  
    const [successMessage, setSuccessMessage] = useState("");
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      
    };
    const handleSubmit = (e) => {
      e.preventDefault();
    
      console.log(formData);
    
      axios.post("http://127.0.0.1:5000/backend/employees", formData, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        setSuccessMessage("✅ Employee added successfully!");
        setFormData({ name: "", phone: "", assignedSite: "", schedule_shift: "" });
      })
      .catch(err => {
        console.error("Error:", err);
        setSuccessMessage("❌ Failed to add employee.");
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
                                                                                               <li><Link to="/admin/ManagePayments">📅 Manage Payments</Link></li>
                                                                                               <li><Link to="/admin/AddPayment">📅 Add Payments</Link></li>
                                                                                               <li><Link to="/admin/ManageSchedule">📅 Manage Schedule</Link></li>
                                                                                               <li><Link to="/admin/payments">💰 Manage Payments</Link></li>
                                                                                               <li><Link to="/">🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Add New Employee</h1>
          <p className="dashboard-intro">Fill the form below to register a new employee.</p>
        </header>

        <section className="dashboard-content">
          <form onSubmit={handleSubmit} className="form-card">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="assignedSite"
              placeholder="Assigned Site"
              value={formData.assignedSite}
              onChange={handleChange}
              required
            />
            <input
  type="text"
  name="schedule_shift"
  placeholder="Schedule Shift (e.g., Morning, Night)"
  value={formData.schedule_shift}
  onChange={handleChange}
  required
/>
<input
  type="datetime-local"
  name="schedule_time"
  value={formData.schedule_time}
  onChange={handleChange}
  required
/>

            <button type="submit" className="submit-btn">Add Employee</button>
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

export default AddEmployee;

import React, { useEffect, useState } from 'react';
import './page.css';
import { Link } from "react-router-dom";
import axios from 'axios';

function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', role: '', assigned_site: '', contact: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('http://127.0.0.1:5000/backend/employees');
    setEmployees(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/backend/employees/${id}`);
    fetchEmployees();
  };

  const handleEditClick = (employee) => {
    setEditingId(employee.id);
    setEditData(employee);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axios.put(`http://127.0.0.1:5000/backend/employees/${editingId}`, editData);
    setEditingId(null);
    fetchEmployees();
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
                                                                                                <li><Link to="/admin/ManageEmployees">📋 Manage Employees</Link></li>
                                                                                                                                                           <li><Link to="/admin/ManagePayments">📅 Manage Payments</Link></li>
                                                                                                                                                           <li><Link to="/admin/AddPayment">📅 Add Payments</Link></li>
                                                                                                                                                           <li><Link to="/admin/ManageSchedule">📅 Manage Schedule</Link></li>
                                                                                                                                                           <li><Link to="/admin/payments">💰 Manage Payments</Link></li>
                                                                                                                                                           <li><Link to="/">🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-mains">
        <header className="dashboard-header">
          <h1>Manage Employees</h1>
          <p className="dashboard-intro">View, edit, and manage employee records below.</p>
        </header>

        <section className="dashboard-content">
          <div className="card">
            <h3 className="card-title">All Employees</h3>
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Assigned Site</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody class="items">
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>
                      {editingId === emp.id ? (
                        <input name="name" value={editData.name} onChange={handleEditChange} />
                      ) : emp.name}
                    </td>
                    <td>
                      {editingId === emp.id ? (
                        <input name="role" value={editData.role} onChange={handleEditChange} />
                      ) : emp.role}
                    </td>
                    <td>
                      {editingId === emp.id ? (
                        <input name="assigned_site" value={editData.assigned_site} onChange={handleEditChange} />
                      ) : emp.assigned_site}
                    </td>
                    <td>
                      {editingId === emp.id ? (
                        <input name="contact" value={editData.contact} onChange={handleEditChange} />
                      ) : emp.contact}
                    </td>
                    <td>
                      {editingId === emp.id ? (
                        <button className="action-btn" onClick={handleUpdate}>Save</button>
                      ) : (
                        <>
                          <button class="editbtn" className="action-btn" onClick={() => handleEditClick(emp)}>Edit</button>
                          <button className="delete-btn action-btn" onClick={() => handleDelete(emp.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ManageEmployees;

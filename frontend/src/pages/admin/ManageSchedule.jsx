import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ManageSchedule.css';

function ManageSchedule() {
  const [employees, setEmployees] = useState([]);
  const [editSchedule, setEditSchedule] = useState({ id: null, schedule_shift: '', schedule_time: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/backend/employees")
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("Error fetching employees!", error);
      });
  }, []);
  const handleEditSchedule = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    setEditSchedule({
      id: employee.id,
      schedule_shift: employee.schedule_shift,
      schedule_time: employee.schedule_time,
    });
    setIsEditing(true);
  };

  const handleUpdateSchedule = (e) => {
    e.preventDefault();

    axios.put(`http://127.0.0.1:5000/backend/employees/${editSchedule.id}/schedule`, editSchedule)
      .then(response => {
        alert('Schedule updated successfully!');
        setIsEditing(false);
        axios.get("http://127.0.0.1:5000/backend/employees")
          .then(res => setEmployees(res.data));
      })
      .catch(error => {
        console.error("Error updating schedule:", error);
        alert('Failed to update schedule.');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditSchedule(prevState => ({
      ...prevState,
      [name]: value,
    }));
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
                                                                                                                             
                                                                                                                             <li><Link to="/">🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>Manage Schedule</h2>
          <p className="dashboard-intro">Below is the schedule info stored under employees.</p>
        </header>

        <div className="schedule-layout">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Assigned Site</th>
                <th>Schedule Shift</th>
                <th>Schedule Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.name}</td>
                  <td>{emp.assigned_site}</td>
                  <td>{emp.schedule_shift}</td>
                  <td>{emp.schedule_time}</td>
                  <td>
                    <button class="editbtn" onClick={() => handleEditSchedule(emp.id)}>Edit Schedule</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isEditing && (
          <div className="edit-schedule-form">
            <h2>Edit Schedule</h2>
            <form onSubmit={handleUpdateSchedule}>
              <div>
                <label>Schedule Shift</label>
                <input
                  type="text"
                  name="schedule_shift"
                  value={editSchedule.schedule_shift}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Schedule Time</label>
                <input
                  type="text"
                  name="schedule_time"
                  value={editSchedule.schedule_time}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Update Schedule</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageSchedule;

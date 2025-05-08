import React, { useEffect, useState } from 'react';
import './paged.css';
import { Link } from "react-router-dom";
import axios from 'axios';

function EmployeeSchedule() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);
  const fetchEmployees = async () => {
    const response = await axios.get('http://127.0.0.1:5000/backend/employees');
    setEmployees(response.data);
  };
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">Employee Panel</h2>
        <nav className="sidebar-nav">
          <ul>

            
          <li><Link to="/employee/Dashboard">🏠 Dashboard</Link></li>
          <li><Link to="/employee/ViewPayments">💰 View Payments</Link></li>
            
          <li><Link to="/employee/EmployeeSchedule">📋 View Schedule</Link></li>
           
          <li><Link to="/employee/EmployeeDashboard">📅 View Employees</Link></li>
            <li><Link to="/">🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-mains">
        <header className="dashboard-header">
          <h1>Employee Schedule</h1>
          <p className="dashboard-intro">View employee assignments and working sites.</p>
        </header>

        <section className="dashboard-content">
          <div className="card">
            <h3 className="card-title">All Scheduled Employees</h3>
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Schedule Shif</th>
                  <th>Schedule Time</th>
                 
                </tr>
              </thead>
              <tbody class="items">
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.schedule_shift}</td>
                    <td>{emp.schedule_time}</td>
                   
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

export default EmployeeSchedule;

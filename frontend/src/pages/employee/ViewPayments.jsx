import React, { useEffect, useState } from 'react';
import './page.css';
import { Link } from "react-router-dom";
import axios from 'axios';

function ViewPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/backend/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">Employee Panel</h2>
        <nav className="sidebar-nav">
          <ul>
           
                       
                     <li><Link to="/employee/EmployeeDashboard">🏠 Dashboard</Link></li>
                     <li><Link to="/employee/ViewPayments">💰 View Payments</Link></li>
                       
                     <li><Link to="/employee/EmployeeSchedule">📋 View Schedule</Link></li>
                      
                     <li><Link to="/employee/EmployeeDashboard">📅 View Employees</Link></li>
                       <li><Link to="/">🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-mains">
        <header className="dashboard-header">
          <h1>View Payments</h1>
          <p className="dashboard-intro">Below is a list of all payment records.</p>
        </header>

        <section className="dashboard-content">
          <div className="card">
            <h3 className="card-title">Payment Records</h3>
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody class="items">
                {payments.map(payment => (
                  <tr key={payment.id}>
                    <td>{payment.employee_name}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.date}</td>
                    <td>{payment.method}</td>
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

export default ViewPayments;

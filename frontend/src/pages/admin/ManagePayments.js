import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagePayments.css';
import { Link } from 'react-router-dom';

function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/backend/payments');
      setPayments(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setLoading(false);
    }
  };

  const deletePayment = async (id) => {
    if (!window.confirm('Delete this payment?')) return;

    try {
      await axios.delete(`http://127.0.0.1:5000/backend/payments/${id}`);
      setPayments(payments.filter((payment) => payment.id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
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
                                                                                                   
                                                                                                    <li><Link to="/">🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Manage Payments</h1>
          <p className="dashboard-intro">View and manage all recorded payments to employees.</p>
        </header>

        <section className="dashboard-content">
          {loading ? (
            <p>Loading payments...</p>
          ) : (
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>'$'.{payment.employee_name}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.payment_date}</td>
                    <td>{payment.payment_method}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deletePayment(payment.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {payments.length === 0 && (
                  <tr>
                    <td colSpan="5">No payments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default ManagePayments;

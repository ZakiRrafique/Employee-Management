import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './page.css';

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/payments")
      .then(res => setPayments(res.data))
      .catch(err => console.error(err));
  }, []);

  const markPaid = (id) => {
    axios.put(`http://localhost:8080/api/payments/${id}/paid`)
      .then(() => {
        setPayments(payments.map(p =>
          p.id === id ? { ...p, status: "Paid" } : p
        ));
      });
  };

  return (
    <div>
      <h2>Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Hours</th>
            <th>Total Pay</th>
            <th>Status</th>
            <th>Mark Paid</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.employeeName}</td>
              <td>{payment.hours}</td>
              <td>£{payment.total}</td>
              <td>{payment.status}</td>
              <td>
                {payment.status !== "Paid" &&
                  <button onClick={() => markPaid(payment.id)}>Mark as Paid</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;

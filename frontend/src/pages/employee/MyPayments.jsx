import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';
function MyPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/employee/payments")
      .then(res => setPayments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>My Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Site</th>
            <th>Hours</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pay, index) => (
            <tr key={index}>
              <td>{pay.site}</td>
              <td>{pay.hours}</td>
              <td>£{pay.amount}</td>
              <td>{pay.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyPayments;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './page.css';

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/reports")
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Monthly Reports</h2>
      <ul>
        {reports.map((report, index) => (
          <li key={index}>
            <strong>{report.month}</strong>: £{report.totalPayment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;

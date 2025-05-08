import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './page.css';

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // You'll connect to backend later
    axios.get("http://localhost:8080/api/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Employees</h2>
      <a href="/admin/employees/add">Add New Employee</a>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>{emp.name} - {emp.phone}</li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;

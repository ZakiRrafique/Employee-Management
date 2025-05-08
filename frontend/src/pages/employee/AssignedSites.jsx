import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AssignedSites() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/employee/sites")
      .then(res => setAssignments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Your Assigned Sites</h2>
      <ul>
        {assignments.map((site, index) => (
          <li key={index}>
            <strong>{site.name}</strong> – {site.location} on {site.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssignedSites;

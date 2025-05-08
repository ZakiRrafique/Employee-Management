import React, { useState } from 'react';
import axios from 'axios';

function Timesheet() {
  const [hours, setHours] = useState("");
  const [site, setSite] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/employee/timesheet", {
      site,
      hours
    }).then(() => {
      alert("Timesheet submitted!");
      setHours("");
      setSite("");
    }).catch(err => {
      console.error(err);
      alert("Error submitting timesheet.");
    });
  };

  return (
    <div>
      <h2>Submit Timesheet</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Site Name"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Hours Worked"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Timesheet;

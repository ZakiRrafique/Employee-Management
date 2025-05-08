import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
function Sites() {
  const [sites, setSites] = useState([]);
  const [newSite, setNewSite] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/sites")
      .then(res => setSites(res.data))
      .catch(err => console.error(err));
  }, []);

  const addSite = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/sites", { name: newSite })
      .then(res => {
        setSites([...sites, res.data]);
        setNewSite("");
      });
  };

  return (
    <div>
      <h2>Work Sites</h2>

      <form onSubmit={addSite}>
        <input
          type="text"
          placeholder="Enter Site Name"
          value={newSite}
          onChange={(e) => setNewSite(e.target.value)}
        />
        <button type="submit">Add Site</button>
      </form>

      <ul>
        {sites.map((site, index) => (
          <li key={index}>{site.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sites;

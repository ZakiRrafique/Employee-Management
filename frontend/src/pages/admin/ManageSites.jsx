import './page.css';

function ManageSites() {
  return (
    <div>
      <h2 className="page-title">Manage Sites</h2>
      <div className="card">
        <h4>Site Assignments</h4>
        <ul>
          <li><strong>Site A:</strong> 3 guards assigned</li>
          <li><strong>Site B:</strong> 2 guards assigned</li>
        </ul>
      </div>
    </div>
  );
}

export default ManageSites;

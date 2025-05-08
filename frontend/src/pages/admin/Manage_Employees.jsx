import './page.css';

function ManageEmployees() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav className="sidebar-nav">
          <ul>
            <li>🏠 Dashboard</li>
            <li>👷 Add Employee</li>
            <li>📋 Manage Employees</li>
            <li>📅 Manage Schedule</li>
            <li>💰 Manage Payments</li>
            <li>🚪 Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-mains">
        <header className="dashboard-header">
          <h1>Manage Employees</h1>
          <p className="dashboard-intro">View, edit, and manage employee records below.</p>
        </header>

        <section className="dashboard-content">
          <div className="card">
            <h3 className="card-title">All Employees</h3>
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Assigned Site</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jane Doe</td>
                  <td>Guard</td>
                  <td>Site A</td>
                  <td>+44 123 4567</td>
                  <td>
                    <button className="action-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>John Smith</td>
                  <td>Supervisor</td>
                  <td>Site B</td>
                  <td>+44 765 4321</td>
                  <td>
                    <button className="action-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
                {/* Add more employee rows */}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ManageEmployees;

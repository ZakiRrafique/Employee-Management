import './page.css';

function ManagePayments() {
  return (
    <div>
      <h2 className="page-title">Manage Payments</h2>
      <div className="card">
        <h4>Monthly Salaries</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Smith</td>
              <td>£2000</td>
              <td>Paid</td>
              <td>Apr 5, 2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagePayments;

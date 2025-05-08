import React, { useEffect, useState } from 'react';
import './dashboard.css';

function EmployeeDashboard() {
  const [schedule, setSchedule] = useState([]);
  const [workHours, setWorkHours] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const employeeId = 1; // Replace with actual employee ID

      const scheduleResponse = await fetch(`http://127.0.0.1:8000/backend/employee/${employeeId}/schedule`);
      const scheduleData = await scheduleResponse.json();
      setSchedule(scheduleData);

      const workHoursResponse = await fetch(`./backend/employee/${employeeId}/hours`);
      const workHoursData = await workHoursResponse.json();
      setWorkHours(workHoursData);

      const paymentsResponse = await fetch(`./backend/employee/${employeeId}/payments`);
      const paymentsData = await paymentsResponse.json();
      setPayments(paymentsData);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-layout"><aside className="sidebar">
    <h2 className="sidebar-title">Employee Panel</h2>
    <nav className="sidebar-nav">
      <ul>
        <li>🏠 Dashboard</li>
        <li>📅 Schedule</li>
        <li>⏱ Hours</li>
        <li>💰 Payments</li>
        <li>⚙️ Settings</li>
        <li>🚪 Logout</li>
      </ul>
    </nav>
  </aside>
      {/* Sidebar and other components */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome, Employee</h1>
        </header>
        <section className="dashboard-content">
          <p className="dashboard-intro">
            Here you can view your work schedule, track hours, and monitor your payments.
          </p>
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>📅 Work Schedule</h3>
              <ul>
                {schedule.map((item) => (
                  <li key={item.id}>
                    {item.day}: {new Date(item.start_time).toLocaleTimeString()} –{' '}
                    {new Date(item.end_time).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="dashboard-card">
              <h3>⏱ Hours Tracked</h3>
              <p>
                This Week: <strong>{workHours.reduce((acc, curr) => acc + curr.hours_worked, 0)} hrs</strong>
              </p>
            </div>
            <div className="dashboard-card">
              <h3>💰 Payments</h3>
              {payments.length > 0 ? (
                <ul>
                  {payments.map((payment) => (
                    <li key={payment.id}>
                      ${payment.amount} on {new Date(payment.date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No payment records available.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default EmployeeDashboard;

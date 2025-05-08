import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './pages/admin/Layout';
import AdminDashboard from "./pages/admin/admindashboard";
import ManageEmployees from './pages/admin/ManageEmployees';
import ManageSites from "./pages/admin/ManageSites";
import ManagePayments from "./pages/admin/ManagePayments";
import Reports from "./pages/admin/Reports";
import AddEmployee from "./pages/admin/AddEmployee";
import ManageSchedule from "./pages/admin/ManageSchedule";
import AddSchedule from "./pages/admin/AddSchedule";
import AddPayment from "./pages/admin/AddPayment";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeSchedule from "./pages/employee/EmployeeSchedule";
import AssignedSites from "./pages/employee/AssignedSites";
import MyPayments from "./pages/employee/MyPayments";
import Notifications from "./pages/employee/Notifications";
import Login from "./pages/employee/Login";
import ViewPayments from "./pages/employee/ViewPayments";
import Signup from "./pages/employee/Signup";
import Admin from "./pages/admin/Admin";
import Welcome from "./pages/employee/Welcome";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
                {}
                <Route path="/" element={<Welcome />} />

{}
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/Admin" element={<Admin />} />


        {}
        <Route path="/admin/AddEmployee" element={<AddEmployee />} />
        <Route path="/employee/EmployeeDashboard" element={<EmployeeDashboard />} />

        <Route path="/employee/ViewPayments" element={<ViewPayments />} />
        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/AddEmployee" element={<AddEmployee />} />
        <Route path="/admin/ManageEmployees" element={<ManageEmployees />} />
        <Route path="/admin/ManageSchedule" element={<ManageSchedule />} />
        <Route path="/admin/ManagePayments" element={<ManagePayments />} />
        <Route path="/admin/AddPayment" element={<AddPayment />} />
        <Route path="/admin/AddSchedule" element={<AddSchedule />} />
        <Route path="/employee/EmployeeDashboard" element={<EmployeeDashboard />} />

        <Route path="/admin/sites" element={<Layout userType="admin"><ManageSites /></Layout>} />
        <Route path="/admin/payments" element={<Layout userType="admin"><ManagePayments /></Layout>} />
        <Route path="/admin/reports" element={<Layout userType="admin"><Reports /></Layout>} />
        <Route path="/employee/EmployeeSchedule" element={<EmployeeSchedule />} />
        {}
        <Route path="/employee/dashboard" element={
          <PrivateRoute>
            <Layout userType="employee"><EmployeeDashboard /></Layout>
          </PrivateRoute>
        } />
        <Route path="/employee/assigned-sites" element={
          <PrivateRoute>
            <Layout userType="employee"><AssignedSites /></Layout>
          </PrivateRoute>
        } />
        <Route path="/employee/payments" element={
          <PrivateRoute>
            <Layout userType="employee"><MyPayments /></Layout>
          </PrivateRoute>
        } />
        <Route path="/employee/notifications" element={
          <PrivateRoute>
            <Layout userType="employee"><Notifications /></Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

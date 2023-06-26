import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { LoginCustomer, LoginOwner, RegisterCustomer, RegisterOwner } from './components/registration-and-login.js'
import { CustomerDashboard, CustomerCompanyDetails, BookingForm } from './components/customer/views.js';
import { OwnerDashboard, OwnerCompanyDetails, OwnerEmployeeDetails } from './components/owner/views.js';
import { AddCompany, AddService, AddEmployee } from './components/owner/adding.js';
import { ModifyCompany, ModifyService, ModifyEmployee } from './components/owner/modifying.js';

import './style.css';

export const API_URL = 'http://0.0.0.0:8080';

const Start = () => {
  const navigate = useNavigate();

  const handleLoginCustomer = () => {
    navigate('/login-customer');
  };

  const handleLoginOwner = () => {
    navigate('/login-owner');
  };

  const handleRegisterCustomer = () => {
    navigate('/register-customer');
  };

  const handleRegisterOwner = () => {
    navigate('/register-owner');
  };

  return (
    <div>
      <h2>Welcome to the Booksy Clone App</h2>
      <h3>Please choose what you would like to do</h3>
      <button className="button" onClick={handleLoginCustomer}>Login Customer</button>
      <button className="button" onClick={handleLoginOwner}>Login Owner</button>
      <button className="button" onClick={handleRegisterCustomer}>Register Customer</button>
      <button className="button" onClick={handleRegisterOwner}>Register Owner</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/start" replace />} />
          <Route path="/start" element={<Start />} />
          <Route path="/login-customer" element={<LoginCustomer />} />
          <Route path="/login-owner" element={<LoginOwner />} />
          <Route path="/register-customer" element={<RegisterCustomer />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/customer-dashboard/company/:companyId" element={<CustomerCompanyDetails />} />
          <Route path="/customer-dashboard/company/:companyId/service/:serviceId" element={<BookingForm />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/owner-dashboard/company/:companyId" element={<OwnerCompanyDetails />} />
          <Route path="/owner-dashboard/company/:companyId/employee/:employeeId" element={<OwnerEmployeeDetails />} />
          <Route path="/owner-dashboard/add-company" element={<AddCompany />} />
          <Route path="/owner-dashboard/company/:companyId/add-service" element={<AddService />} />
          <Route path="/owner-dashboard/company/:companyId/add-employee" element={<AddEmployee />} />
          <Route path="/owner-dashboard/modify-company/:companyId" element={<ModifyCompany />} />
          <Route path="/owner-dashboard/company/:companyId/modify-service/:serviceId" element={<ModifyService />} />
          <Route path="/owner-dashboard/company/:companyId/modify-employee/:employeeId" element={<ModifyEmployee />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

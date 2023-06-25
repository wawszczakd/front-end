import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { OwnerCompanyCard, OwnerServiceCard, OwnerEmployeeCard } from './cards';
import { API_URL } from '../../App.js';

import '../../style.css';

export const OwnerDashboard = () => {
  const navigate = useNavigate();
  
  const handleAddCompany = () => {
    navigate('/owner-dashboard/add-company');
  };
  
  const [companies, setCompanies] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    fetch(`${API_URL}/owners/companies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  
  const removeCompany = (companyId) => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.id !== companyId)
    );
  };
  
  return (
    <div className="companies-list-layout">
      <div className="companies-list-top">
        <h2>Owner Dashboard</h2>
        
        <button className="button" onClick={handleAddCompany}>Add Company</button>
        
        <br />
        <br />
        <br />
        <br />
        
        <h2>Your companies</h2>
      </div>
      
      {companies.length > 0 ? (
        <div className="companies-list-bottom">
          {companies.map((company) => (
            <OwnerCompanyCard
              key={company.id}
              company={company}
              onRemove={() => removeCompany(company.id)}
            />
          ))}
        </div>
      ) : (
        <div className="companies-list-bottom">
          <p>You don't have any companies</p>
        </div>
      )}
    </div>
  );
};

export const OwnerCompanyDetails = () => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  const handleAddService = () => {
    navigate(`/owner-dashboard/${companyId}/add-service`);
  };
  
  const handleAddEmployee = () => {
    navigate(`/owner-dashboard/${companyId}/add-employee`);
  };
  
  const handleRemoveService = (serviceId) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    setServices(updatedServices);
  };
  
  const handleRemoveEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees(updatedEmployees);
  };
  
  useEffect(() => {
    fetch(`${API_URL}/companies/${companyId}`)
      .then(response => response.json())
      .then(data => {
        setCompany(data);
        setServices(data.services);
        setEmployees(data.employees);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [companyId]);
  
  if (!company) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="split-layout">
      <div className="top-pane">
        <h2>Company Details</h2>
        <h3>{company.name}</h3>
        <p>{company.long_description}</p>
        <button className="button" onClick={handleAddService}>Add Service</button>
        <button className="button" onClick={handleAddEmployee}>Add Employee</button>
      </div>
      
      <div className="left-top-pane">
        <h2>List of Employees</h2>
      </div>
      
      {employees && employees.length > 0 ? (
        <div className="left-bottom-pane">
          {employees.map((employee) => (
            <OwnerEmployeeCard
              key={employee.id}
              employee={employee}
              onRemove={() => handleRemoveEmployee(employee.id)}
            />
          ))}
        </div>
      ) : (
        <div className="left-bottom-pane">
          <p>No employees found.</p>
        </div>
      )}
      
      <div className="right-top-pane">
        <h2>List of Services</h2>
      </div>
      
      {services && services.length > 0 ? (
        <div className="right-bottom-pane">
          {services.map((service) => (
            <OwnerServiceCard
              key={service.id}
              service={service}
              onRemove={() => handleRemoveService(service.id)}
            />
          ))}
        </div>
      ) : (
        <div className="right-bottom-pane">
          <p>No services found.</p>
        </div>
      )}
    </div>
  );
};

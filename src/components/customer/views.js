import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { CustomerCompanyCard, CustomerServiceCard, CustomerEmployeeCard } from './cards.js';
import { API_URL } from '../../App.js';

import '../../style.css';

export const CustomerDashboard = () => {
  const navigate = useNavigate();
  
  const [companies, setCompanies] = useState([]);
  
  useEffect(() => {
    fetch(`${API_URL}/companies`)
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  
  const handleBack = () => {
    navigate(`/start`);
  };
  
  return (
    <div className="companies-list-layout">
      <div className="companies-list-top">
        <button className="back-button" onClick={handleBack}>Back</button>
        
        <h2>List of Companies</h2>
        
        <br />
      </div>
      
      <div className="companies-list-bottom">
        {companies.map((company) => (
          <CustomerCompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export const CustomerCompanyDetails = () => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  
  useEffect(() => {
    fetch(`${API_URL}/companies/${companyId}`)
      .then(response => response.json())
      .then(data => setCompany(data))
      .catch(error => {
        console.error('Error:', error);
      });
  }, [companyId]);
  
  if (!company) {
    return <div>Loading...</div>;
  }
  
  const handleBack = () => {
    navigate(`/customer-dashboard`);
  };
  
  return (
    <div className="split-layout">
      <div className="top-pane">
        <button className="back-button" onClick={handleBack}>Back</button>
        
        <h2>Company Details</h2>
        <h3>{company.name}</h3>
        <p>{company.long_description}</p>
        
        <br />
      </div>
      
      <div className="left-top-pane">
        <h2>List of Employees</h2>
      </div>
      
      {company.employees ? (
        <div className="left-bottom-pane">
          {company.employees.map((employee) => (
            <CustomerEmployeeCard key={employee.id} employee={employee} />
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
      
      {company.services ? (
        <div className="right-bottom-pane">
          {company.services.map((service) => (
            <CustomerServiceCard key={service.id} service={service} companyId={companyId} />
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

export const BookingForm = () => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      date: date,
      time: time,
      mail: email,
    };
    
    console.log('Form Data:', formData);
  };
  
  const handleBack = () => {
    navigate(`/customer-dashboard/company/${companyId}`);
  };
  
  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      
      <h2>Booking Form</h2>
      
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

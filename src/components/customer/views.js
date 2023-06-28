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

export const CustomerGetTimes = () => {
  const navigate = useNavigate();
  
  const service = JSON.parse(localStorage.getItem('service'));
  
  const { companyId, serviceId } = useParams();
  
  const [date, setDate] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/avaliable-dates/companies/${companyId}/services/${serviceId}?service_duration=${service.duration}&date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('available-times', JSON.stringify(data));
        navigate(`/customer-dashboard/company/${companyId}/service/${service.id}/available-times`);
      })
      .catch(error => {
        console.error('Error:', error);
      })
  };
  
  const handleBack = () => {
    navigate(`/customer-dashboard/company/${companyId}`);
  };
  
  return (
    <div className="form">
      <div className="form-top">
        <button className="back-button" onClick={handleBack}>Back</button>
        
        <h2>Appointment</h2>
      </div>
      <div className="form-bottom">
        <form onSubmit={handleSubmit}>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <br />
          <button className="button" type="submit">Find available times</button>
        </form>
      </div>
    </div>
  );
};

export const CustomerAvailableTimes = () => {
  const navigate = useNavigate();
  const { companyId, serviceId } = useParams();
  
  const availableTimes = JSON.parse(localStorage.getItem('available-times'));
  const availableEmployees = availableTimes.filter(employee => employee.time_slots);
  
  const handleBack = () => {
    navigate(`/customer-dashboard/company/${companyId}/service/${serviceId}`);
  };
  
  const handleTimeSlotClick = (employeeId, startTime, endTime) => {
    const data = {
      company_id: companyId,
      service_id: serviceId,
      employee_id: employeeId,
      start_time: startTime,
      end_time: endTime
    };
    
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/customer-dashboard`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  return (
    <div className="form">
      <div className="form-top">
        <button className="back-button" onClick={handleBack}>Back</button>
        
        <h2>Available Times</h2>
      </div>
      <div className="form-bottom">
        {availableEmployees.length > 0 ? (
          availableEmployees.map(employee => (
            <div key={employee.id}>
              <h3>{`${employee.name} ${employee.surname}`}</h3>
              <ul>
                {employee.time_slots.map((timeSlot, index) => {
                  const startTime = new Date(timeSlot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                  const endTime = new Date(timeSlot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                  return (
                    <li key={index}>
                      <a href="#" onClick={() => handleTimeSlotClick(employee.id, timeSlot.start_time, timeSlot.end_time)}>
                        {`${startTime} - ${endTime}`}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        ) : (
          <p>No available times</p>
        )}
      </div>
    </div>
  );
}

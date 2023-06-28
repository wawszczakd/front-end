import React from 'react';
import { useNavigate } from 'react-router-dom';

import { formatPrice, formatDuration } from  '../functions.js';
import { API_URL } from '../../App.js';

import '../../style.css';

export const CustomerCompanyCard = ({ company }) => {
  const navigate = useNavigate();
  
  const handleSelectCompany = () => {
    navigate(`/customer-dashboard/company/${company.id}`);
  };
  
  return (
    <div className="clickable-card" onClick={handleSelectCompany}>
      <h3>{company.name}</h3>
      <p>{company.localisation}</p>
      <p>{company.type}</p>
      <p>{company.short_description}</p>
    </div>
  );
};

export const CustomerEmployeeCard = ({ employee }) => {
  return (
    <div className="not-clickable-card">
      <p>{employee.name} {employee.surname}</p>
    </div>
  );
};

export const CustomerServiceCard = ({ service, companyId }) => {
  const navigate = useNavigate();
  
  const handleSelectService = () => {
    localStorage.setItem('service', JSON.stringify(service));
    navigate(`/customer-dashboard/company/${companyId}/service/${service.id}`);
  };
  
  return (
    <div className="clickable-card" onClick={handleSelectService}>
      <h3>{service.name}</h3>
      <p>Price: {formatPrice(service.price)}</p>
      <p>Duration: {formatDuration(service.duration)}</p>
      <p>Description: {service.description}</p>
    </div>
  );
};

export const CustomerAppointmentCard = ({ appointment, onCancel }) => {
  const handleCancelAppointment = (event) => {
    event.stopPropagation();
    
    const token = localStorage.getItem('token');
    
    const data = {
      order_id: appointment.id
    };
    
    fetch(`${API_URL}/orders/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        onCancel();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  return (
    <div className="not-clickable-card">
      <p>id: {appointment.id}</p>
      <p>company_id: {appointment.company_id}</p>
      <p>service_id: {appointment.service_id}</p>
      <p>employee_id: {appointment.employee_id}</p>
      <p>order_time: {appointment.order_time}</p>
      
      <div className="button-group">
        <button className="remove-button" onClick={handleCancelAppointment}>
          Cancel
        </button>
      </div>
    </div>
  );
};

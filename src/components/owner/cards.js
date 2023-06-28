import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { formatPrice, formatDuration } from  '../functions.js';
import { API_URL } from '../../App.js';

import '../../style.css';

export const OwnerCompanyCard = ({ company, onRemove }) => {
  const navigate = useNavigate();
  
  const handleSelectCompany = () => {
    navigate(`/owner-dashboard/company/${company.id}`);
  };
  
  const handleRemoveCompany = (event) => {
    event.stopPropagation();
    
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/companies/${company.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onRemove();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleModifyCompany = () => {
    navigate(`/owner-dashboard/modify-company/${company.id}`);
  };
  
  return (
    <div className="clickable-card">
      <div onClick={handleSelectCompany}>
        <h3>{company.name}</h3>
        <p>{company.localisation}</p>
        <p>{company.type}</p>
        <p>{company.short_description}</p>
      </div>
      <div className="button-group">
        <button className="remove-button" onClick={handleRemoveCompany}>
          Remove
        </button>
        <button className="modify-button" onClick={handleModifyCompany}>
          Modify
        </button>
      </div>
    </div>
  );
};

export const OwnerServiceCard = ({ service, onRemove }) => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  
  const handleRemoveService = () => {
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/companies/${companyId}/services/${service.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onRemove(service.id);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleModifyService = () => {
    localStorage.setItem('service', JSON.stringify(service));
    navigate(`/owner-dashboard/company/${companyId}/modify-service/${service.id}`);
  };
  
  return (
    <div className="not-clickable-card">
      <h3>{service.name}</h3>
      <p>Price: {formatPrice(service.price)}</p>
      <p>Duration: {formatDuration(service.duration)}</p>
      <p>Description: {service.description}</p>
      <div className="button-group">
        <button className="modify-button" onClick={handleModifyService}>
          Modify
        </button>
        <button className="remove-button" onClick={handleRemoveService}>
          Remove
        </button>
      </div>
    </div>
  );
};

export const OwnerEmployeeCard = ({ employee, onRemove }) => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  
  const handleRemoveEmployee = () => {
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/companies/${companyId}/employees/${employee.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onRemove(employee.id);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleModifyEmployee = () => {
    navigate(`/owner-dashboard/company/${companyId}/modify-employee/${employee.id}`);
  };
  
  const handleSelectEmployee = () => {
    navigate(`/owner-dashboard/company/${companyId}/employee/${employee.id}`);
  };
  
  return (
    <div className="clickable-card">
      <div onClick={handleSelectEmployee}>
        <p>{employee.name} {employee.surname}</p>
        <br />
        <br />
        <br />
        <br />
      </div>
      <div className="button-group">
        <button className="modify-button" onClick={handleModifyEmployee}>
          Modify
        </button>
        <button className="remove-button" onClick={handleRemoveEmployee}>
          Remove
        </button>
      </div>
    </div>
  );
};

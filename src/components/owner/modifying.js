import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { API_URL } from '../../App.js';

import '../../style.css';

export const ModifyCompany = () => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  
  useEffect(() => {
    fetch(`${API_URL}/companies/${companyId}`)
      .then((response) => response.json())
      .then((data) => {
        setCompany(data);
        setName(data.name);
        setType(data.type);
        setLocalisation(data.localisation);
        setShortDescription(data.short_description);
        setLongDescription(data.long_description);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [companyId]);
  
  if (!company) {
    return <div>Loading...</div>;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name: name,
      type: type,
      localisation: localisation,
      short_description: shortDescription,
      long_description: longDescription
    };
    
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/companies/${companyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/owner-dashboard`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleBack = () => {
    navigate(`/owner-dashboard`);
  };
  
  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      
      <h2>Modify Company</h2>
      
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Type:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <br />
        <label>Localisation:</label>
        <input
          type="text"
          value={localisation}
          onChange={(e) => setLocalisation(e.target.value)}
          required
        />
        <br />
        <label>Short Description:</label>
        <input
          type="text"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
        />
        <br />
        <label>Long Description:</label>
        <textarea
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          required
        />
        <br />
        <button className="button" type="submit">Modify Company</button>
      </form>
    </div>
  );
};

export const ModifyService = () => {
  const navigate = useNavigate();
  
  const service = JSON.parse(localStorage.getItem('service'));
  
  const { companyId, serviceId } = useParams();
  
  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState(service.price);
  const [duration, setDuration] = useState(service.duration);
  const [description, setDescription] = useState(service.description);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name: name,
      price: parseInt(price),
      duration: parseInt(duration),
      description: description
    };
    
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/companies/${companyId}/services/${serviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/owner-dashboard/company/${companyId}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleBack = () => {
    navigate(`/owner-dashboard/company/${companyId}`);
  };
  
  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      
      <h2>Modify Service</h2>
      
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Price (gr):</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={1}
          max={1000000}
          required
        />
        <br />
        <label>Duration (m):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min={10}
          max={480}
          required
        />
        <br />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <button className="button" type="submit">Modify Service</button>
      </form>
    </div>
  );
};

export const ModifyEmployee = () => {
  const navigate = useNavigate();
  
  const { companyId, employeeId } = useParams();
  
  return ("Modify employee: " + companyId + " " + employeeId);
};

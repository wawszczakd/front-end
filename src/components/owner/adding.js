import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { formatWorkTimes } from  '../functions.js';
import { API_URL } from '../../App.js';

import '../../style.css';

export const AddCompany = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  
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
    
    fetch(`${API_URL}/companies`, {
      method: 'POST',
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
      
      <h2>Add Company</h2>
      
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
        <button className="button" type="submit">Add Company</button>
      </form>
    </div>
  );
};

export const AddService = () => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('1');
  const [duration, setDuration] = useState('10');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name: name,
      price: parseInt(price),
      duration: parseInt(duration),
      description: description
    };
    
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/companies/${companyId}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/owner-dashboard/${companyId}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleBack = () => {
    navigate(`/owner-dashboard/${companyId}`);
  };
  
  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      
      <h2>Add Service</h2>
      
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
        <button className="button" type="submit">Add Service</button>
      </form>
    </div>
  );
};

export const AddEmployee = () => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [workTimes, setWorkTimes] = useState({
    mo: [],
    tu: [],
    we: [],
    th: [],
    fr: [],
    sa: [],
    su: []
  });
  const [competence, setCompetence] = useState([]);
  
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
  
  const handleWorkTimeChange = (day, index, field, value) => {
    setWorkTimes((prevWorkTimes) => {
      const updatedWorkTimes = { ...prevWorkTimes };
      updatedWorkTimes[day][index][field] = value;
      return updatedWorkTimes;
    });
  };
  
  const handleAddWorkTime = (event, day) => {
    event.preventDefault();
    event.stopPropagation();
    
    setWorkTimes((prevWorkTimes) => {
      const updatedWorkTimes = {
        ...prevWorkTimes,
        [day]: [...prevWorkTimes[day], { from: '', to: '' }]
      };
      return updatedWorkTimes;
    });
  };
  
  const handleRemoveWorkTime = (event, day, index) => {
    event.preventDefault();
    event.stopPropagation();
    
    setWorkTimes((prevWorkTimes) => {
      const updatedWorkTimes = {
        ...prevWorkTimes,
        [day]: prevWorkTimes[day].filter((_, i) => i !== index)
      };
      return updatedWorkTimes;
    });
  };
  
  const handleServiceChange = (serviceId) => {
    if (competence.includes(serviceId)) {
      setCompetence((prevCompetence) =>
        prevCompetence.filter((id) => id !== serviceId)
      );
    } else {
      setCompetence((prevCompetence) => [...prevCompetence, serviceId]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedWorkTimes = {
      ...workTimes,
      mo: formatWorkTimes(workTimes.mo),
      tu: formatWorkTimes(workTimes.tu),
      we: formatWorkTimes(workTimes.we),
      th: formatWorkTimes(workTimes.th),
      fr: formatWorkTimes(workTimes.fr),
      sa: formatWorkTimes(workTimes.sa),
      su: formatWorkTimes(workTimes.su)
    };
    
    const formData = {
      name: name,
      surname: surname,
      work_times: formattedWorkTimes,
      competence: competence
    };
    
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/companies/${companyId}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/owner-dashboard/${companyId}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const dayMapping = {
    mo: 'Monday',
    tu: 'Tuesday',
    we: 'Wednesday',
    th: 'Thursday',
    fr: 'Friday',
    sa: 'Saturday',
    su: 'Sunday'
  };
  
  const handleBack = () => {
    navigate(`/owner-dashboard/${companyId}`);
  };
  
  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      
      <h2>Add Employee</h2>
      
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Surname:</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <br />
        <label>Work Times:</label>
        <br />
        {Object.keys(workTimes).map((day) => (
          <div key={day}>
            <label>{dayMapping[day]}:</label>
            {workTimes[day].map((time, index) => (
              <div key={index}>
                from
                <input
                  type="time"
                  value={time.from}
                  step="600"
                  onChange={(e) =>
                    handleWorkTimeChange(day, index, 'from', e.target.value)
                  }
                />
                to
                <input
                  type="time"
                  value={time.to}
                  step="600"
                  onChange={(e) =>
                    handleWorkTimeChange(day, index, 'to', e.target.value)
                  }
                />
                <button className="button" onClick={(event) => handleRemoveWorkTime(event, day, index)}>Remove</button>
                <br />
                <br />
              </div>
            ))}
            <button className="button" onClick={(event) => handleAddWorkTime(event, day)}>Add Work Time</button>
            <br />
            <br />
          </div>
        ))}
        <br />
        <label>Competence:</label>
        {company.services && company.services.map((service) => (
          <div key={service.id}>
            <input
              type="checkbox"
              id={service.id}
              value={service.id}
              checked={competence.includes(service.id)}
              onChange={() => handleServiceChange(service.id)}
            />
            <label htmlFor={service.id}>{service.name}</label>
          </div>
        ))}
        <br />
        <button className="button" type="submit">Add Employee</button>
      </form>
    </div>
  );
};

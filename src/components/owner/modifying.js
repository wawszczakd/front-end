import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { formatWorkTimes, reverseFormatTime } from '../functions.js';
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
  const [company, setCompany] = useState(null);
  const [employee, setEmployee] = useState(null);
  
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
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/companies/${companyId}/employees/${employeeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setEmployee(data);
        setName(data.name);
        setSurname(data.surname);
        const formattedWorkTimes = Object.keys(data.work_times).reduce((result, day) => {
          const times = data.work_times[day] || [];
          result[day] = times.map(({ from, to }) => ({
            from: reverseFormatTime(from),
            to: reverseFormatTime(to)
          }));
          return result;
        }, {});
        setWorkTimes(formattedWorkTimes);
        setCompetence(data.competence);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [employeeId]);
  
  if (!company || !employee) {
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
    }
    else {
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
    
    fetch(`${API_URL}/companies/${companyId}/employees/${employeeId}`, {
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
    navigate(`/owner-dashboard/company/${companyId}`);
  };
  
  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      
      <h2>Modify Employee</h2>
      
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
        <br />
        <label>Work Times:</label>
        <br />
        <div className="employee-form">
          {Object.keys(workTimes).map((day) => (
            <div key={day} className={`employee-form-${day}`}>
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
                  <button className="form-button" onClick={(event) => handleRemoveWorkTime(event, day, index)}>Remove</button>
                  <br />
                  <br />
                </div>
              ))}
              <button className="form-button" onClick={(event) => handleAddWorkTime(event, day)}>Add time</button>
              <br />
              <br />
            </div>
          ))}
        </div>
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
        <button className="button" type="submit">Modify Employee</button>
      </form>
    </div>
  );
};

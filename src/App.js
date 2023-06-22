import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';

import './style.css';

const API_URL = 'http://0.0.0.0:8080';

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

const LoginCustomer = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      mail: email,
      pwd: password
    };

    fetch(`${API_URL}/login/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        navigate('/customer-dashboard');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Login Customer</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const LoginOwner = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      mail: email,
      pwd: password
    };

    fetch(`${API_URL}/login/owners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        navigate('/owner-dashboard');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Login Owner</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const RegisterCustomer = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      surname: surname,
      mail: email,
      pwd: password
    };

    fetch(`${API_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/start`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Register Customer</h2>
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
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const RegisterOwner = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      surname: surname,
      mail: email,
      pwd: password
    };

    fetch(`${API_URL}/owners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/start`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Register Customer</h2>
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
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const CustomerDashboard = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/companies`)
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="companies-list-layout">
      <div className="companies-list-top">
        <h2>List of Companies</h2>
      </div>
      
      <div className="companies-list-bottom">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  const handleSelectCompany = () => {
    navigate(`/customer-dashboard/${company.id}`);
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

const CompanyDetails = () => {
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

  return (
    <div className="split-layout">
      <div className="top-pane">
        <h2>Company Details</h2>
        <h3>{company.name}</h3>
        <p>{company.long_description}</p>
      </div>
      
      <div className="left-top-pane">
        <h2>List of Employees</h2>
      </div>
      
      {company.employees ? (
        <div className="left-bottom-pane">
          {company.employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
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
            <ServiceCard key={service.id} service={service} companyId={companyId} />
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

const EmployeeCard = ({ employee }) => {
  return (
    <div className="not-clickable-card">
      <p>{employee.name} {employee.surname}</p>
    </div>
  );
};

const ServiceCard = ({ service, companyId }) => {
  const navigate = useNavigate();

  const handleSelectService = () => {
    navigate(`/customer-dashboard/${companyId}/${service.id}`);
  };
  
  const formatPrice = (price) => {
    const zl = Math.floor(price / 100);
    const gr = price % 100;
  
    if (zl > 0) {
      return `${zl} zł ${gr} gr`;
    }
    else {
      return `${gr} gr`;
    }
  };
  
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    if (hours > 0) {
      return `${hours} h ${minutes} m`;
    }
    else {
      return `${minutes} m`;
    }
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

const BookingForm = () => {
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
  
  return (
    <div>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const OwnerDashboard = () => {
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
  
  return (
    <div className="companies-list-layout">
      <div className="companies-list-top">
        <h2>Owner Dashboard</h2>
        
        <button className="button" onClick={handleAddCompany}>Add Company</button>
        
        <br />
        <br />
        
        <h2>Your companies</h2>
      </div>
      
      <div className="companies-list-bottom">
        {companies.map((company) => (
          <OwnerCompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

const AddCompany = () => {
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

  return (
    <div>
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
        <button type="submit">Add Company</button>
      </form>
    </div>
  );
};

const AddService = () => {
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
        console.log(data);
        navigate(`/owner-dashboard/${companyId}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
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
        <label>Price:</label>
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
          step={10}
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
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

const AddEmployee = () => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      surname: surname,
      work_times: workTimes,
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
        console.log(data);
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
  
  return (
    <div>
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
        <input
          type="text"
          value={competence}
          onChange={(e) => setCompetence(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

const OwnerCompanyCard = ({ company }) => {
  const navigate = useNavigate();

  const handleSelectCompany = () => {
    navigate(`/owner-dashboard/${company.id}`);
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

const OwnerServiceCard = ({ service }) => {
  const formatPrice = (price) => {
    const zl = Math.floor(price / 100);
    const gr = price % 100;
  
    if (zl > 0) {
      return `${zl} zł ${gr} gr`;
    }
    else {
      return `${gr} gr`;
    }
  };
  
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
  
    if (hours > 0) {
      return `${hours} h ${minutes} m`;
    }
    else {
      return `${minutes} m`;
    }
  };

  return (
    <div className="not-clickable-card">
      <h3>{service.name}</h3>
      <p>Price: {formatPrice(service.price)}</p>
      <p>Duration: {formatDuration(service.duration)}</p>
      <p>Description: {service.description}</p>
    </div>
  );
};

const OwnerCompanyDetails = () => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  
  const handleAddService = () => {
    navigate(`/owner-dashboard/${companyId}/add-service`);
  };
  
  const handleAddEmployee = () => {
    navigate(`/owner-dashboard/${companyId}/add-employee`);
  };
  
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

  return (
    <div className="split-layout">
      <div className="top-pane">
        <h2>Company Details</h2>
        <h3>{company.name}</h3>
        <p>{company.long_description}</p>
        <button className="button" onClick={handleAddService}>Add Service</button>
        <button className="button" onClick={handleAddEmployee}>Add employee</button>
      </div>
      
      <div className="left-top-pane">
        <h2>List of Employees</h2>
      </div>
      
      {company.employees ? (
        <div className="left-bottom-pane">
          {company.employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
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
            <OwnerServiceCard key={service.id} service={service} companyId={companyId} />
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

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/start" element={<Start />} />
          <Route path="/login-customer" element={<LoginCustomer />} />
          <Route path="/login-owner" element={<LoginOwner />} />
          <Route path="/register-customer" element={<RegisterCustomer />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/customer-dashboard/:companyId" element={<CompanyDetails />} />
          <Route path="/customer-dashboard/:companyId/:serviceId" element={<BookingForm />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/owner-dashboard/add-company" element={<AddCompany />} />
          <Route path="/owner-dashboard/:companyId" element={<OwnerCompanyDetails />} />
          <Route path="/owner-dashboard/:companyId/add-service" element={<AddService />} />
          <Route path="/owner-dashboard/:companyId/add-employee" element={<AddEmployee />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

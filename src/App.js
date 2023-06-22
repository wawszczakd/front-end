import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';

import './style.css';

const Address = 'http://0.0.0.0:8080';

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

    fetch(`${Address}/login/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate('/companies');
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

    fetch(`${Address}/login/owners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

    fetch(`${Address}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

    fetch(`${Address}/owners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(`${Address}/companies`)
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => {
        console.error('Error fetching companies:', error);
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
    navigate(`/companies/${company.id}`);
  };

  return (
    <div className="company-card" onClick={handleSelectCompany}>
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
    fetch(`${Address}/companies/${companyId}`)
      .then(response => response.json())
      .then(data => setCompany(data))
      .catch(error => {
        console.error('Error fetching company:', error);
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
    <div className="employee-card">
      <p>{employee.name} {employee.surname}</p>
    </div>
  );
};

const ServiceCard = ({ service, companyId }) => {
  const navigate = useNavigate();

  const handleSelectService = () => {
    navigate(`/companies/${companyId}/${service.id}`);
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
    <div className="service-card" onClick={handleSelectService}>
      <h3>{service.name}</h3>
      <p>Price: {service.price}</p>
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

  const handleAddService = () => {
    navigate('/owner-dashboard/add-service');
  };

  const handleAddWorker = () => {
    navigate('/owner-dashboard/add-worker');
  };

  return (
    <div>
      <h2>Owner Dashboard</h2>
      <h3>Please choose an action</h3>
      
      <button className="button" onClick={handleAddCompany}>Add Company</button>
      <button className="button" onClick={handleAddService}>Add Service</button>
      <button className="button" onClick={handleAddWorker}>Add Worker</button>
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
      long_description: longDescription,
    };

    fetch(`${Address}/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include', // These to lines are supposed to include cookies, but unfortunately it doesn't work
      withCredentials: true,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
  return (
    <h2>Add Service</h2>
  )
};

const AddWorker = () => {
  return (
    <h2>Add Worker</h2>
  )
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
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:companyId" element={<CompanyDetails />} />
          <Route path="/companies/:companyId/:serviceId" element={<BookingForm />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/owner-dashboard/add-company" element={<AddCompany />} />
          <Route path="/owner-dashboard/add-service" element={<AddService />} />
          <Route path="/owner-dashboard/add-worker" element={<AddWorker />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

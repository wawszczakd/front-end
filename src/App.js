import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';

import './style.css';

const CompanyListAddress = 'http://0.0.0.0:8080/companies';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(CompanyListAddress)
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
    fetch(`${CompanyListAddress}/${companyId}`)
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
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Details:', bookingDetails);
    // Handle form submission here
    alert('Form submitted');
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={bookingDetails.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={bookingDetails.time}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={bookingDetails.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={bookingDetails.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/:companyId" element={<CompanyDetails />} />
          <Route path="/companies/:companyId/:serviceId" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

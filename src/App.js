import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

import './style.css';

const CompanyList = ({ companies }) => {
  return (
    <div>
      <h2>List of Companies</h2>
      {companies.map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
    </div>
  );
};

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  const handleSelectCompany = () => {
    navigate(`/${company.name}`);
  };

  return (
    <div className="company-card" onClick={handleSelectCompany}>
      <h3>{company.name}</h3>
      <p>{company.localisation}</p>
      <p>{company.type}</p>
      <p>{company.long_description}</p>
    </div>
  );
};


const ServiceList = ({ companies }) => {
  const { company } = useParams();
  const selectedCompany = companies.find((c) => c.name === company);

  if (!selectedCompany) {
    return <div>Company not found.</div>;
  }

  return (
    <div>
      <h2>List of Services</h2>
      {selectedCompany.services.map((service) => (
        <ServiceCard key={service._id} service={service} companyName={selectedCompany.name} />
      ))}
    </div>
  );
};

const ServiceCard = ({ service, companyName }) => {
  const navigate = useNavigate();

  const handleSelectService = () => {
    navigate(`/${companyName}/${service._id}`);
  };

  return (
    <div className="service-card" onClick={handleSelectService}>
      <h3>{service.name}</h3>
      <p>Price: {service.price}</p>
      <p>Duration: {service.duration}</p>
      <p>Description: {service.description}</p>
    </div>
  );
};

const BookingForm = () => {
  const { company, serviceId } = useParams();

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
      <h3>Selected Company: {company}</h3>
      <h3>Selected Service ID: {serviceId}</h3>
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
  const [companies] = useState([
    // Example data
    {
      _id: '1',
      name: 'Company 1',
      type: 'Type 1',
      localisation: 'Location 1',
      long_description: 'This is company 1',
      services: [
        {
          _id: '1',
          name: 'Service 1',
          price: 10,
          duration: 60,
          description: 'This is service 1',
        },
        {
          _id: '2',
          name: 'Service 2',
          price: 20,
          duration: 90,
          description: 'This is service 2',
        },
      ],
    },
    {
      _id: '2',
      name: 'Company 2',
      type: 'Type 2',
      localisation: 'Location 2',
      long_description: 'This is company 2',
      services: [
        {
          _id: '3',
          name: 'Service 3',
          price: 15,
          duration: 45,
          description: 'This is service 3',
        },
        {
          _id: '4',
          name: 'Service 4',
          price: 25,
          duration: 120,
          description: 'This is service 4',
        },
      ],
    },
  ]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CompanyList companies={companies} />} />
          <Route path="/:company" element={<ServiceList companies={companies} />} />
          <Route path="/:company/:serviceId" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

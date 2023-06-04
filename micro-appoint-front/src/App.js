import React, { useState } from 'react';
import './style.css';

const CompanyList = ({ companies, handleCompanySelection }) => {
  return (
    <div>
      <h2>List of Companies</h2>
      {companies.map((company) => (
        <CompanyCard
          key={company._id}
          company={company}
          handleCompanySelection={handleCompanySelection}
        />
      ))}
    </div>
  );
};

const CompanyCard = ({ company, handleCompanySelection }) => {
  const handleSelectCompany = () => {
    handleCompanySelection(company);
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

const ServiceList = ({ services, handleServiceSelection }) => {
  return (
    <div>
      <h2>List of Services</h2>
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
          handleServiceSelection={handleServiceSelection}
        />
      ))}
    </div>
  );
};

const ServiceCard = ({ service, handleServiceSelection }) => {
  const handleSelectService = () => {
    handleServiceSelection(service);
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

const BookingForm = ({ selectedService, handleBookingSubmission }) => {
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
    handleBookingSubmission(selectedService, bookingDetails);
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <h3>Selected Service: {selectedService.name}</h3>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const App = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const handleCompanySelection = (company) => {
    setSelectedCompany(company);
    setSelectedService(null);
  };

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  const handleBookingSubmission = (service, bookingDetails) => {
    // Handle booking submission here
    console.log('Booking submitted:', service, bookingDetails);
    alert('Booking submitted.');
  };

  return (
    <div>
      <CompanyList
        companies={companies}
        handleCompanySelection={handleCompanySelection}
      />
      {selectedCompany && !selectedService && (
        <ServiceList
          services={selectedCompany.services}
          handleServiceSelection={handleServiceSelection}
        />
      )}
      {selectedService && (
        <BookingForm
          selectedService={selectedService}
          handleBookingSubmission={handleBookingSubmission}
        />
      )}
    </div>
  );
};

// Example data
const companies = [
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
];

export default App;

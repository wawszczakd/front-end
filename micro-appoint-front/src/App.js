import React, { useState } from 'react';

const CompanyList = ({ companies, handleCompanySelection }) => {
  return (
    <div>
      <h2>List of Companies</h2>
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
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
      <p>{company.description}</p>
      <p>Contact: {company.contact}</p>
    </div>
  );
};

const BookingForm = ({ selectedCompany, handleBookingSubmission }) => {
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
    handleBookingSubmission(selectedCompany, bookingDetails);
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <h3>Selected Company: {selectedCompany.name}</h3>
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

// Example data
const companies = [
  {
    id: 1,
    name: 'Company 1',
    description: 'This is company 1',
    contact: 'company1@example.com',
  },
  {
    id: 2,
    name: 'Company 2',
    description: 'This is company 2',
    contact: 'company2@example.com',
  },
];

const App = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanySelection = (company) => {
    setSelectedCompany(company);
  };

  const handleBookingSubmission = (company, bookingDetails) => {
    // TODO: Make real booking submission handler.
    console.log('Booking submitted:', company, bookingDetails);
    alert('Booking submitted.');
  };

  return (
    <div>
      <CompanyList
        companies={companies}
        handleCompanySelection={handleCompanySelection}
      />
      {selectedCompany && (
        <BookingForm
          selectedCompany={selectedCompany}
          handleBookingSubmission={handleBookingSubmission}
        />
      )}
    </div>
  );
};

export default App;

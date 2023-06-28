import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { OwnerCompanyCard, OwnerServiceCard, OwnerEmployeeCard, OwnerAppointmentCard } from './cards';
import { reverseFormatTime } from '../functions';
import { API_URL } from '../../App.js';

import '../../style.css';

export const OwnerDashboard = () => {
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
  
  const removeCompany = (companyId) => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.id !== companyId)
    );
  };
  
  const handleBack = () => {
    navigate(`/start`);
  };
  
  return (
    <div className="companies-list-layout">
      <div className="companies-list-top">
        <button className="back-button" onClick={handleBack}>Back</button>
        
        <h2>Owner Dashboard</h2>
        
        <button className="button" onClick={handleAddCompany}>Add Company</button>
        
        <br />
        <br />
        <br />
        
        <h2>Your Companies</h2>
      </div>
      
      {companies.length > 0 ? (
        <div className="companies-list-bottom">
          {companies.map((company) => (
            <OwnerCompanyCard
              key={company.id}
              company={company}
              onRemove={() => removeCompany(company.id)}
            />
          ))}
        </div>
      ) : (
        <div className="companies-list-bottom">
          <p>No companies found.</p>
        </div>
      )}
    </div>
  );
};

export const OwnerCompanyDetails = () => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  const handleAddService = () => {
    navigate(`/owner-dashboard/company/${companyId}/add-service`);
  };
  
  const handleAddEmployee = () => {
    navigate(`/owner-dashboard/company/${companyId}/add-employee`);
  };
  
  const handleRemoveService = (serviceId) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    setServices(updatedServices);
  };
  
  const handleRemoveEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees(updatedEmployees);
  };
  
  const handleAppointments = () => {
    navigate(`/owner-dashboard/company/${companyId}/appointments`);
  }
  
  useEffect(() => {
    fetch(`${API_URL}/companies/${companyId}`)
      .then(response => response.json())
      .then(data => {
        setCompany(data);
        setServices(data.services);
        setEmployees(data.employees);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [companyId]);
  
  if (!company) {
    return <div>Loading...</div>;
  }
  
  const handleBack = () => {
    navigate(`/owner-dashboard/`);
  };
  
  return (
    <div className="split-layout">
      <div className="top-pane">
        <button className="back-button" onClick={handleBack}>Back</button>
        
        <h2>Company Details</h2>
        <h3>{company.name}</h3>
        <p>{company.long_description}</p>
        
        <button className="button" onClick={handleAddService}>Add Service</button>
        <button className="button" onClick={handleAddEmployee}>Add Employee</button>
        <button className="button" onClick={handleAppointments}>Appointments List</button>
        
        <br />
        <br />
        <br />
      </div>
      
      <div className="left-top-pane">
        <h2>List of Employees</h2>
      </div>
      
      {employees && employees.length > 0 ? (
        <div className="left-bottom-pane">
          {employees.map((employee) => (
            <OwnerEmployeeCard
              key={employee.id}
              employee={employee}
              onRemove={() => handleRemoveEmployee(employee.id)}
            />
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
      
      {services && services.length > 0 ? (
        <div className="right-bottom-pane">
          {services.map((service) => (
            <OwnerServiceCard
              key={service.id}
              service={service}
              onRemove={() => handleRemoveService(service.id)}
            />
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

export const OwnerEmployeeDetails = () => {
  const navigate = useNavigate();
  
  const { companyId, employeeId } = useParams();
  const [company, setCompany] = useState(null);
  const [employee, setEmployee] = useState(null);
  
  useEffect(() => {
    fetch(`${API_URL}/companies/${companyId}`)
      .then(response => response.json())
      .then(data => {
        setCompany(data);
      })
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
      .then(data => setEmployee(data))
      .catch(error => {
        console.error('Error:', error);
      });
  }, [employeeId]);
  
  if (!company || !employee) {
    return <div>Loading...</div>;
  }
  
  const generateTimeList = (day, workTimes) => {
    if (workTimes && workTimes[day]) {
      return workTimes[day].map((time, index) => (
        <li key={index}>
          {reverseFormatTime(time.from)} - {reverseFormatTime(time.to)}
        </li>
      ));
    } else {
      return null;
    }
  };
  
  const serviceNames = employee.competence
  ? employee.competence.map((serviceId) => {
      const service = company.services.find((service) => service.id === serviceId);
      return service ? service.name : '';
    })
  : [];
  
  const handleBack = () => {
    navigate(`/owner-dashboard/company/${companyId}`);
  };
  
  return (
    <div className="employee-layout">
      <div className="employee-top">
        <button className="back-button" onClick={handleBack}>Back</button>
        
        <h2>Employee Details</h2>
        <h3>{employee.name} {employee.surname}</h3>
        
        <br />
        
        <h2>Work Times</h2>
      </div>
      
      <div className="employee-mo">
        <p>Monday</p>
        <ul style={{ padding: '0', paddingLeft: '20px' }}>
          {generateTimeList("mo", employee.work_times)}
        </ul>
      </div>
      <div className="employee-tu">
        <p>Tuesday</p>
        <ul style={{ padding: '0', paddingLeft: '20px' }}>
          {generateTimeList("tu", employee.work_times)}
        </ul>
      </div>
      <div className="employee-we">
        <p>Wednesday</p>
        <ul style={{ padding: '0', paddingLeft: '20px' }}>
          {generateTimeList("we", employee.work_times)}
        </ul>
      </div>
      <div className="employee-th">
        <p>Thursday</p>
        <ul style={{ padding: '0', paddingLeft: '20px' }}>
          {generateTimeList("th", employee.work_times)}
        </ul>
      </div>
      <div className="employee-fr">
        <p>Friday</p>
        <ul style={{ padding: '0', paddingLeft: '20px' }}>
          {generateTimeList("fr", employee.work_times)}
        </ul>
      </div>
      <div className="employee-sa">
        <p>Saturday</p>
        <ul style={{ padding: '0', paddingLeft: '20px' }}>
          {generateTimeList("sa", employee.work_times)}
        </ul>
      </div>
      <div className="employee-su">
        <p>Sunday</p>
        <ul style={{ padding: '0', paddingLeft: '20px' }}>
          {generateTimeList("su", employee.work_times)}
        </ul>
      </div>
      
      <div className="employee-bottom">
        <br />
        <h2>Competence</h2>
        <ul style={{ padding: '0', paddingLeft: '20px' }}>
          {serviceNames.map((serviceName, index) => (
            <li key={index}>{serviceName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const OwnerAppointments = () => {
  const navigate = useNavigate();
  
  const { companyId } = useParams();
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch(`${API_URL}/companies/${companyId}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setAppointments(data);
      })
      .catch(error => {
        console.error('Error:', error);
      })
  }, [])
  
  const handleBack = () => {
    navigate(`/owner-dashboard/company/${companyId}`);
  };
  
  const appointmentsFiltered = (appointments ? appointments.filter(appointment => !appointment.is_canceled) : []);
  
  return (
    <div className="companies-list-layout">
      <div className="companies-list-top">
        <button className="back-button" onClick={handleBack}>Back</button>
        
        <h2>List of Appointments</h2>
      </div>
      
      {appointmentsFiltered.length > 0 ? (
        <div className="companies-list-bottom">
          {appointmentsFiltered.map((appointment) => (
            <OwnerAppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))}
        </div>
      ) : (
        <p>There aren't any appointments</p>
      )}
    </div>
  );
}

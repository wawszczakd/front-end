import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../App';

import '../style.css';

export const LoginCustomer = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      mail : email,
      pwd  : password
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
        navigate(`/customer-dashboard`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleBack = () => {
    navigate(`/start`);
  };
  
  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      
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
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
};

export const LoginOwner = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      mail : email,
      pwd  : password
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
        navigate(`/owner-dashboard`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleBack = () => {
    navigate(`/start`);
  };
  
  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      
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
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
};

export const RegisterCustomer = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name    : name,
      surname : surname,
      mail    : email,
      pwd     : password
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
        navigate(`/login-customer`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleBack = () => {
    navigate('/start');
  };
  
  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      
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
        <button className="button" type="submit">Register</button>
      </form>
    </div>
  );
};

export const RegisterOwner = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name    : name,
      surname : surname,
      mail    : email,
      pwd     : password
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
        navigate(`/login-owner`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleBack = () => {
    navigate(`/start`);
  };
  
  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      
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
        <button className="button" type="submit">Register</button>
      </form>
    </div>
  );
};

import React, { useState } from 'react';


function Login() {
  const [inputs, setInputs] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const validateLogin = () => {
    const { username, password } = inputs;

    // Example hardcoded credentials
    const validUsername = 'operationManager';
    const validPassword = 'operation123';

    if (username === validUsername && password === validPassword) {
      alert('Login successful!');
      // Redirect to inventory dashboard or another page
      window.location.href = '/allbookings';
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Client Manager Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={inputs.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={inputs.password}
        onChange={handleChange}
        required
      />
      <button onClick={validateLogin}>Login</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Login;

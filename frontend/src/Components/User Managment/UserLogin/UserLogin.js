import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function UserLogin() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    type: "",
    gmail: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/employee/login", {
        type: inputs.type,
        gmail: inputs.gmail,
        name: inputs.name,
      });

      if (response.status === 200) {
        // Navigate to the user's profile using emp._id from the response
        navigate(`/profile/${response.data.user._id}`);
      } else {
        window.alert(response.data.message || "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      window.alert("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select
            name="type"
            value={inputs.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Client">Client</option>
            <option value="Employee">Employee</option>
          </select>
        </label>
        <br />
        <label>
          Gmail:
          <input
            type="email"
            name="gmail"
            value={inputs.gmail}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserLogin;

import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddEmploye() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    type: "",
    name: "",
    gmail: "",
    phone: "",
    address: "",
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
      const response = await sendRequest();
      console.log(response.data); // Add this line to inspect the response
      window.alert("Employee Account Created successfully!");
      navigate(`/profile/${response.data.emp._id}`);
    } catch (error) {
      console.error("There was an error creating the employee!", error);
      window.alert("Failed to create Employee Account.");
    }
  };
  
  const sendRequest = async () => {
    return await axios.post("http://localhost:5000/employee", {
      type: inputs.type,
      name: inputs.name,
      gmail: inputs.gmail,
      phone: inputs.phone,
      address: inputs.address,
    });
  };

  const handleLoginNavigate = () => {
    navigate("/userlogin");
  };

  return (
    <div>
      
      <div className="children_div_admin">
        <h1 className="topic_mash_mart">
          Create Account For
          <span className="sub_topic_mash_mart"> Employee/Client</span>{" "}
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
          <label className="form_box_item_lable">Type</label>
<br></br>
<select
  className="form_box_item_input"
  required
  value={inputs.type}
  onChange={handleChange}
  name="type"
>
  <option value="">Select Type</option> {/* Optional placeholder */}
  <option value="Client">Client</option>
  <option value="Employee">Employee</option>
</select>


  <br></br>
            <label className="form_box_item_lable">name</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              required
              value={inputs.name}
              onChange={handleChange}
              name="name"
            />
            <br></br>
            <label className="form_box_item_lable">gmail</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="email"
              value={inputs.gmail}
              onChange={handleChange}
              name="gmail"
              required
            />
            <br></br>
            <label className="form_box_item_lable">phone</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              pattern="[0-9]{10}" 
              value={inputs.phone}
              onChange={handleChange}
              name="phone"
              required
            />
            <br></br>
            <label className="form_box_item_lable">address</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.address}
              onChange={handleChange}
              name="address"
              required
            />
            <br></br>
            <button type="submit" className="admin_form_cneter_btn">
              Submit
            </button>
          </form>
          <br></br>
          <p>Already have an account?</p>
            <button onClick={handleLoginNavigate} className="login_navigate_btn">
              Login
            </button>

        </div>
      </div>
    </div>
  );
}

export default AddEmploye;

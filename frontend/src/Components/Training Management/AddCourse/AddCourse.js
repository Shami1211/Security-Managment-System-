import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddCourse() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    courseCategory: "", // Updated field name
    name: "",
    duration: "", // Added duration field
    startDate: "", // Added start date field
    endDate: "", // Added end date field
    details: "", // Added details field
    security: "", // Added security field
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputs.courseCategory || // Updated field check
      !inputs.name ||
      !inputs.duration || // Updated field check
      !inputs.startDate || // Updated field check
      !inputs.endDate || // Updated field check
      !inputs.details || // Updated field check
      !inputs.security // Updated field check
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/trainings", inputs); // Updated endpoint
      showAlert("Course added successfully!");
      navigate("/coursedash"); // Updated navigation path
    } catch (error) {
      console.error("Error adding course:", error);
      showAlert("Error adding course. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleViewCourses = () => {
    navigate("/courses");
  };

  return (
    <div>
      <div className="course-full-box">
        <div>
          <h1 className="course-topic">
            Add <span className="course-us">Course</span>
          </h1>
          <form onSubmit={handleSubmit} className="course-full-box-form">
            <label className="course-full-box-label">Course Category</label>
            <br />
            <select
              name="courseCategory"
              value={inputs.courseCategory}
              onChange={handleChange}
              className="course-input"
              required
            >
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="health">Health</option>
              <option value="finance">Finance</option>
            </select>
            <br />
            <label className="course-full-box-label">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              className="course-input"
              required
            />
            <br />
            <label className="course-full-box-label">Duration</label>
            <br />
            <input
              type="text"
              name="duration"
              value={inputs.duration}
              onChange={handleChange}
              className="course-input"
              required
            />
            <br />
            <label className="course-full-box-label">Start Date</label>
            <br />
            <input
              type="date"
              name="startDate"
              value={inputs.startDate}
              onChange={handleChange}
              className="course-input"
              required
            />
            <br />
            <label className="course-full-box-label">End Date</label>
            <br />
            <input
              type="date"
              name="endDate"
              value={inputs.endDate}
              onChange={handleChange}
              className="course-input"
              required
            />
            <br />
            <label className="course-full-box-label">Details</label>
            <br />
            <textarea
              name="details"
              value={inputs.details}
              onChange={handleChange}
              className="course-input"
              required
            />
            <br />
            <label className="course-full-box-label">Security Information</label>
            <br />
            <input
              type="text"
              name="security"
              value={inputs.security}
              onChange={handleChange}
              className="course-input"
              required
            />
            <br />
            <button type="submit" className="course-add-btn">
              Add Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;

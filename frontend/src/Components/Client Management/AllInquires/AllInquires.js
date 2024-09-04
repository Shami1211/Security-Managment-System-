import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/inquiries"; // Updated URL for inquiries

const InquiryDetails = () => {
  const [inquiries, setInquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    email: "",
    message: "",
    status: "",
    response: "",
  });

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(URL);
      setInquiries(response.data.inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const handleSearch = () => {
    const filteredInquiries = inquiries.filter((inquiry) =>
      Object.values(inquiry).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setInquiries(filteredInquiries);
    setNoResults(filteredInquiries.length === 0);
  };

  const handleUpdate = async (id) => {
    const selectedInquiry = inquiries.find((inquiry) => inquiry._id === id);
    if (selectedInquiry) {
      setUpdateData({
        id: selectedInquiry._id,
        name: selectedInquiry.name,
        email: selectedInquiry.email,
        message: selectedInquiry.message,
        status: selectedInquiry.status || "Pending", // Default status
        response: selectedInquiry.response || "", // Default response
      });
    }
  };

  const handleChange = (newValue, name) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${updateData.id}`, updateData);
      fetchInquiries(); // Refresh inquiries after update
      setUpdateData({
        id: "",
        name: "",
        email: "",
        message: "",
        status: "",
        response: "",
      });
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedInquiries = inquiries.filter((inquiry) => inquiry._id !== id);
        setInquiries(updatedInquiries); // Update inquiries after delete
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  /* PDF Functionality */
  const summaryRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Inquiries Report",
    onAfterPrint: () => alert("Successfully Downloaded!"),
    onClose: () => alert("Print canceled"),
  });

  return (
    <div className="inquiry-details">
      <div className="admin_topic_inquiry">
        Admin<span className="admin_sub_topic_inquiry"> Dashboard</span>
      </div>
      <div className="inquiry_details_body">
        <div className="btn_con_inquiry">
         
          <button
            type="submit"
            className="inquiry-add-btn-admin"
            onClick={handlePrint}
          >
            Generate Report
          </button>
        </div>
        <div className="search_box">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className="search_ipt"
            placeholder="Search Inquiries"
          />
          <button onClick={handleSearch} className="searchbtn">
            Search
          </button>
        </div>
        <div ref={summaryRef}>
          <div className="admin_topic_inquiry">
            Inquiry<span className="admin_sub_topic_inquiry"> Details</span>
          </div>
          <br />
          {noResults ? (
            <h1 className="inquiry-topic">
              No results <span className="inquiry-us">found</span>
            </h1>
          ) : (
            <table className="inquiry-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry._id}>
                    <td>{inquiry.name}</td>
                    <td>{inquiry.email}</td>
                    <td>{inquiry.message}</td>
                    <td>{inquiry.status || "Pending"}</td>
                    <td>
                      <button
                        className="update_btn"
                        onClick={() => handleUpdate(inquiry._id)}
                      >
                        Update
                      </button>
                      <button
                        className="delete_btn"
                        onClick={() => handleDelete(inquiry._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {updateData.id && (
            <form className="update_form" onSubmit={handleSubmit}>
              <hr />
              <br />
              <label className="inquiry-full-box-label">Name</label>
              <br />
              <input
                className="inquiry-full-box-input_update"
                type="text"
                name="name"
                value={updateData.name}
                onChange={(e) => handleChange(e.target.value, "name")}
                required
              />
              <br />
              <label className="inquiry-full-box-label">Email</label>
              <br />
              <input
                className="inquiry-full-box-input_update"
                type="email"
                name="email"
                value={updateData.email}
                onChange={(e) => handleChange(e.target.value, "email")}
                required
              />
              <br />
              <label className="inquiry-full-box-label">Message</label>
              <br />
              <textarea
                className="inquiry-full-box-input_update"
                name="message"
                value={updateData.message}
                onChange={(e) => handleChange(e.target.value, "message")}
                required
              />
              <br />
              <label className="inquiry-full-box-label">Status</label>
              <br />
              <select
                className="inquiry-full-box-input_update"
                name="status"
                value={updateData.status}
                onChange={(e) => handleChange(e.target.value, "status")}
                required
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <br />
              <label className="inquiry-full-box-label">Response</label>
              <br />
              <textarea
                className="inquiry-full-box-input_update"
                name="response"
                value={updateData.response}
                onChange={(e) => handleChange(e.target.value, "response")}
              />
              <br />
              <button type="submit" className="update_form_submit">
                Update Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryDetails;

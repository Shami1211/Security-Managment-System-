import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/bookings"; // Updated URL for bookings

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    packages: "",
    date: "",
    status: "",
    securityOfficer: "",
    specialInstructions: "",
  });

  useEffect(() => {
    fetchBookings();
    fetchPayments(); // Fetch payments as well
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(URL);
      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/payments'); // Adjust the URL if needed
      setPayments(response.data.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handleSearch = () => {
    const filteredBookings = bookings.filter((booking) =>
      Object.values(booking).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setBookings(filteredBookings);
    setNoResults(filteredBookings.length === 0);
  };

  const handleUpdate = async (id) => {
    const selectedBooking = bookings.find((booking) => booking._id === id);
    if (selectedBooking) {
      setUpdateData({
        id: selectedBooking._id,
        name: selectedBooking.name,
        email: selectedBooking.email,
        phone: selectedBooking.phone,
        packages: selectedBooking.packages,
        date: new Date(selectedBooking.date).toISOString().split("T")[0], // Format the date
        status: selectedBooking.status || "Pending",
        securityOfficer: selectedBooking.securityOfficer || "",
        specialInstructions: selectedBooking.specialInstructions || "",
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
      fetchBookings(); // Refresh bookings after update
      setUpdateData({
        id: "",
        name: "",
        email: "",
        phone: "",
        packages: "",
        date: "",
        status: "",
        securityOfficer: "",
        specialInstructions: "",
      });
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedBookings = bookings.filter((booking) => booking._id !== id);
        setBookings(updatedBookings); // Update bookings after delete
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  /* PDF Functionality */
  const summaryRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Bookings Report",
    onAfterPrint: () => alert("Successfully Downloaded!"),
    onClose: () => alert("Print canceled"),
  });

  // Helper function to get payment status by booking ID
  const getPaymentStatus = (bookingId) => {
    const payment = payments.find(p => p.bookingId._id === bookingId);
    return payment ? payment.status : "Not Paid";
  };

  return (
    <div className="booking-details">
      <div className="admin_topic_booking">
        Admin<span className="admin_sub_topic_booking"> Dashboard</span>
      </div>
      <div className="booking_details_body">
        <div className="btn_con_booking">
          <button
            type="button"
            className="booking-add-btn-admin"
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
            placeholder="Search Bookings"
          />
          <button onClick={handleSearch} className="searchbtn">
            Search
          </button>
        </div>
        <div ref={summaryRef}>
          <div className="admin_topic_booking">
            Booking<span className="admin_sub_topic_booking"> Details</span>
          </div>
          <br />
          {noResults ? (
            <h1 className="booking-topic">
              No results <span className="booking-us">found</span>
            </h1>
          ) : (
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Packages</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment Status</th> {/* Added new column for payment status */}
                  <th>Security Officer</th>
                  <th>Special Instructions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.packages}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.status || "Pending"}</td>
                    <td>{getPaymentStatus(booking._id)}</td> {/* Display payment status */}
                    <td>{booking.securityOfficer || "N/A"}</td>
                    <td>{booking.specialInstructions || "None"}</td>
                    <td>
                      <button
                        className="update_btn"
                        onClick={() => handleUpdate(booking._id)}
                      >
                        Update
                      </button>
                      <button
                        className="delete_btn"
                        onClick={() => handleDelete(booking._id)}
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
              <label className="booking-full-box-label">Name</label>
              <br />
              <input
                className="booking-full-box-input_update"
                type="text"
                name="name"
                value={updateData.name}
                onChange={(e) => handleChange(e.target.value, "name")}
                required
              />
              <br />
              <label className="booking-full-box-label">Email</label>
              <br />
              <input
                className="booking-full-box-input_update"
                type="email"
                name="email"
                value={updateData.email}
                onChange={(e) => handleChange(e.target.value, "email")}
                required
              />
              <br />
              <label className="booking-full-box-label">Phone</label>
              <br />
              <input
                className="booking-full-box-input_update"
                type="text"
                name="phone"
                value={updateData.phone}
                onChange={(e) => handleChange(e.target.value, "phone")}
                required
              />
              <br />
              <label className="booking-full-box-label">Packages</label>
              <br />
              <input
                className="booking-full-box-input_update"
                type="text"
                name="packages"
                value={updateData.packages}
                onChange={(e) => handleChange(e.target.value, "packages")}
                required
              />
              <br />
              <label className="booking-full-box-label">Date</label>
              <br />
              <input
                className="booking-full-box-input_update"
                type="date"
                name="date"
                value={updateData.date}
                onChange={(e) => handleChange(e.target.value, "date")}
                required
              />
              <br />
              <label className="booking-full-box-label">Status</label>
              <br />
              <input
                className="booking-full-box-input_update"
                type="text"
                name="status"
                value={updateData.status}
                onChange={(e) => handleChange(e.target.value, "status")}
                required
              />
              <br />
              <label className="booking-full-box-label">Security Officer</label>
              <br />
              <input
                className="booking-full-box-input_update"
                type="text"
                name="securityOfficer"
                value={updateData.securityOfficer}
                onChange={(e) => handleChange(e.target.value, "securityOfficer")}
              />
              <br />
              <label className="booking-full-box-label">Special Instructions</label>
              <br />
              <input
                className="booking-full-box-input_update"
                type="text"
                name="specialInstructions"
                value={updateData.specialInstructions}
                onChange={(e) => handleChange(e.target.value, "specialInstructions")}
              />
              <br />
              <button type="submit" className="update_submit">
                Update Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBookings;

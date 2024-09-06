import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/bookings";

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

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
    fetchPayments();
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
      const response = await axios.get("http://localhost:5000/payments");
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
      fetchBookings();
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

  /* PDF Functionality */
  const summaryRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Bookings Report",
    onAfterPrint: () => alert("Successfully Downloaded!"),
    onClose: () => alert("Print canceled"),
  });

  const getPaymentStatus = (bookingId) => {
    const payment = payments.find((p) => p.bookingId === bookingId);
    return payment ? payment.status : "Not Paid";
  };

  const handleCreateSchedule = (booking) => {
    navigate("/add-operation", {
      state: { booking },
    });
  };

  const handleViewSchedules = () => {
    navigate("/operations");
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

        <button
            type="button"
            className="booking-add-btn-admin"
            onClick={handleViewSchedules}
          >
            View All Schedules
          </button>

        
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
                  <th>Payment Status</th>
                  <th>Security Officer</th>
                  <th>Special Instructions</th>
                  <th>Action</th>
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
                    <td>{getPaymentStatus(booking._id)}</td>
                    <td>{booking.securityOfficer || "N/A"}</td>
                    <td>{booking.specialInstructions || "None"}</td>
                    <td>
                      <button
                        onClick={() => handleCreateSchedule(booking)}
                        className="create-schedule-btn"
                      >
                        Create Schedule
                      </button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {updateData.id && (
            <form className="update_form" onSubmit={handleSubmit}>
              {/* Update form fields */}
              <button className="update_form_submit_btn" type="submit">
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

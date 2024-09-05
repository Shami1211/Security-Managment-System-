// ValidateBookingsForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ValidateBookingsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBooking, setUpdatedBooking] = useState({
    name: '',
    email: '',
    phone: '',
    packages: '',
    date: '',
    status: '',
    specialInstructions: '',
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/bookings/validate", { name, email });
      setBookingData(response.data.existingBooking);
      setError('');
      setUpdatedBooking(response.data.existingBooking); // Set the initial values for editing
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('No matching booking found');
        setBookingData(null);
      } else {
        setError('Internal Server Error');
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/bookings/${bookingData._id}`, updatedBooking);
      setBookingData(response.data.updatedBooking);
      setIsEditing(false); // Exit edit mode
      setError('');
    } catch (err) {
      setError('Failed to update booking');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/bookings/${bookingData._id}`);
      setBookingData(null); // Clear the booking data after deletion
      setError('Booking deleted successfully');
    } catch (err) {
      setError('Failed to delete booking');
    }
  };

  const handleMakePayment = () => {
  navigate(`/addpayment/${bookingData._id}`);
};


  return (
    <div>
      <h2>Validate Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Validate</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {bookingData && (
        <div>
          <h3>Booking Details</h3>
          {!isEditing ? (
            <>
              <p><strong>Name:</strong> {bookingData.name}</p>
              <p><strong>Email:</strong> {bookingData.email}</p>
              <p><strong>Phone:</strong> {bookingData.phone}</p>
              <p><strong>Packages:</strong> {bookingData.packages}</p>
              <p><strong>Date:</strong> {new Date(bookingData.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {bookingData.status}</p>
              <p><strong>Special Instructions:</strong> {bookingData.specialInstructions || 'None'}</p>
              <p><strong>Created At:</strong> {new Date(bookingData.createdAt).toLocaleDateString()}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleMakePayment} style={{ marginLeft: '10px' }}>Make Payment</button>
            </>
          ) : (
            <>
              <input 
                type="text" 
                value={updatedBooking.name} 
                onChange={(e) => setUpdatedBooking({ ...updatedBooking, name: e.target.value })} 
              />
              <input 
                type="email" 
                value={updatedBooking.email} 
                onChange={(e) => setUpdatedBooking({ ...updatedBooking, email: e.target.value })} 
              />
              <input 
                type="text" 
                value={updatedBooking.phone} 
                onChange={(e) => setUpdatedBooking({ ...updatedBooking, phone: e.target.value })} 
              />
              <input 
                type="text" 
                value={updatedBooking.packages} 
                onChange={(e) => setUpdatedBooking({ ...updatedBooking, packages: e.target.value })} 
              />
              <input 
                type="date" 
                value={updatedBooking.date.substring(0,10)} 
                onChange={(e) => setUpdatedBooking({ ...updatedBooking, date: e.target.value })} 
              />
              <select 
                value={updatedBooking.status} 
                onChange={(e) => setUpdatedBooking({ ...updatedBooking, status: e.target.value })}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <textarea 
                value={updatedBooking.specialInstructions} 
                onChange={(e) => setUpdatedBooking({ ...updatedBooking, specialInstructions: e.target.value })} 
              />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ValidateBookingsForm;

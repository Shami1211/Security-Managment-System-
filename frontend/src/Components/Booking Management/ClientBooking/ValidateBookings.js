import React, { useState } from 'react';
import axios from 'axios';

const ValidateBookingsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/bookings/validate", { name, email });
      setBookingData(response.data.existingBooking);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('No matching booking found');
        setBookingData(null);
      } else {
        setError('Internal Server Error');
      }
    }
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
          <p><strong>Name:</strong> {bookingData.name}</p>
          <p><strong>Email:</strong> {bookingData.email}</p>
          <p><strong>Phone:</strong> {bookingData.phone}</p>
          <p><strong>Packages:</strong> {bookingData.packages}</p>
          <p><strong>Date:</strong> {new Date(bookingData.date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {bookingData.status}</p>
          <p><strong>Special Instructions:</strong> {bookingData.specialInstructions || 'None'}</p>
          <p><strong>Created At:</strong> {new Date(bookingData.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default ValidateBookingsForm;

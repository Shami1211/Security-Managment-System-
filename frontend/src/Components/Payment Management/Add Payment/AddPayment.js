// AddPaymentForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddPaymentForm = () => {
  const { bookingId } = useParams(); // Extract bookingId from URL
  
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Credit Card');
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch booking details to ensure booking exists
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/bookings/${bookingId}`);
        setBooking(response.data.booking);
      } catch (err) {
        console.error(err);
        setMessage('Failed to fetch booking details');
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentData = {
        bookingId,
        amount: parseFloat(amount),
        method,
        status,
      };

      await axios.post('http://localhost:5000/payments', paymentData);
      setMessage('Payment added successfully');
      
      
    
    } catch (err) {
      console.error(err);
      setMessage('Error adding payment');
    }
  };

  if (!booking) {
    return <p>Loading booking details...</p>;
  }

  return (
    <div>
      <h2>Add Payment for Booking: {booking.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label>Payment Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <button type="submit">Submit Payment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPaymentForm;

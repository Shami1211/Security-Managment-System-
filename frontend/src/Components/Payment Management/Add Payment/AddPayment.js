import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const AddPaymentForm = () => {
  const { bookingId } = useParams(); // Extract bookingId from URL
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Credit Card');
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [filename, setFilename] = useState('payment-details');  // State to hold the filename
  const paymentDetailsRef = useRef();  // Ref for the section to capture

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

      const response = await axios.post('http://localhost:5000/payments', paymentData);
      setMessage('Payment added successfully');
      setPaymentDetails(response.data.newPayment);  // Set the payment details to display
    } catch (err) {
      console.error(err);
      setMessage('Error adding payment');
    }
  };

  const downloadAsImage = async () => {
    const element = paymentDetailsRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `${filename}.png`;  // Use the filename from state
    link.click();
  };

  const downloadAsPDF = async () => {
    const element = paymentDetailsRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${filename}.pdf`);  // Use the filename from state
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
        <button type="submit">Submit Payment</button>
      </form>
      {message && <p>{message}</p>}

      {paymentDetails && (
        <div ref={paymentDetailsRef}>
          <h3>Payment Details</h3>
          <p>Amount: {paymentDetails.amount}</p>
          <p>Method: {paymentDetails.method}</p>
          <p>Status: {paymentDetails.status}</p>
          <p>Date: {new Date(paymentDetails.createdAt).toLocaleString()}</p>
        </div>
      )}

      {paymentDetails && (
        <div>
          <div>
            <label>Enter Filename: </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Enter file name"
            />
          </div>
          <button onClick={downloadAsImage}>Download as PNG</button>
          <button onClick={downloadAsPDF}>Download as PDF</button>
        </div>
      )}
    </div>
  );
};

export default AddPaymentForm;

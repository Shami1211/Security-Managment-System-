import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/payments'); // Adjust the URL if needed
        setPayments(response.data.payments);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch payments');
        setLoading(false);
      }
    };
    
    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/payments/${id}`);
      setPayments(payments.filter(payment => payment._id !== id));
    } catch (err) {
      setError('Failed to delete payment');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="payment-table">
      <h2>All Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td>{payment.bookingId ? payment.bookingId._id : 'N/A'}</td>
              <td>{payment.bookingId ? payment.bookingId.name : 'N/A'}</td>
              <td>{payment.bookingId ? payment.bookingId.email : 'N/A'}</td>
              <td>{payment.bookingId ? new Date(payment.bookingId.date).toLocaleDateString() : 'N/A'}</td>
              <td>{payment.amount}</td>
              <td>{payment.method}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(payment._id)} style={{ color: 'red' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;

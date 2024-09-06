import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [updatedPayment, setUpdatedPayment] = useState(null);

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

  const handleUpdate = (payment) => {
    setEditingPayment(payment);
    setUpdatedPayment(payment); // Initialize the form with the current payment details
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPayment(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/payments/${updatedPayment._id}`, updatedPayment);
      const updatedPayments = payments.map(payment =>
        payment._id === updatedPayment._id ? updatedPayment : payment
      );
      setPayments(updatedPayments);
      setEditingPayment(null); // Close the update form
    } catch (err) {
      setError('Failed to update payment');
    }
  };

  const handleDelete = async (paymentId) => {
    try {
      await axios.delete(`http://localhost:5000/payments/${paymentId}`);
      setPayments(payments.filter(payment => payment._id !== paymentId));
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
                <button onClick={() => handleUpdate(payment)}>Update</button>
                <button onClick={() => handleDelete(payment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {editingPayment && (
        <div className="update-form">
          <h2>Update Payment</h2>
          <form onSubmit={handleUpdateSubmit}>
            <label>
              Amount:
              <input
                type="number"
                name="amount"
                value={updatedPayment.amount}
                onChange={handleUpdateChange}
              />
            </label>
            <label>
              Method:
              <select
                name="method"
                value={updatedPayment.method}
                onChange={handleUpdateChange}
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Cash">Cash</option>
              </select>
            </label>
            <label>
              Status:
              <input
                type="text"
                name="status"
                value={updatedPayment.status}
                onChange={handleUpdateChange}
              />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingPayment(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;

const express = require('express');
const payment_router = express.Router();
const PaymentController = require('../Controllers/PaymentController');
const { downloadReceipt } = require('../Controllers/PaymentController');

// Add a new payment
payment_router.post('/', PaymentController.addPayment);

// Get all payments
payment_router.get('/', PaymentController.getAllPayments);

// Get a payment by id
payment_router.get('/:id', PaymentController.getPaymentById);

// Update a payment by id
payment_router.put('/:id', PaymentController.updatePayment);

// Delete a payment by id
payment_router.delete('/:id', PaymentController.deletePayment);


module.exports = payment_router;

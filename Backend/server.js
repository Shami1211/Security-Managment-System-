const express = require("express");
const mongoose = require("mongoose");
const ItemRoute = require("./Routes/InventoryRoute.js")
const EmployeeRoutes = require('./Routes/UserRoutes.js');
const TrainingRouter = require('./Routes/TrainingRoutes.js');
const ClientRoute = require("./Routes/ClientRoutes.js")
const bookingRoutes = require("./Routes/BookingRoutes.js")
const paymentRoutes = require("./Routes/PaymentRoute.js")
const operationRoutes = require("./Routes/OperationRoute.js")
const connectDB = require("./Config/db.js")
const dotenv = require("dotenv")
const cors = require("cors");
const app = express();

dotenv.config(); 
connectDB();

// Apply CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
  }));

app.use(cors());
app.use(express.json());

//Routes
app.use('/items',ItemRoute);
app.use('/employee', EmployeeRoutes);
app.use('/trainings', TrainingRouter);
app.use('/inquiries', ClientRoute); 
app.use("/bookings", bookingRoutes);
app.use("/payments", paymentRoutes);
app.use("/operations", operationRoutes);



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
 
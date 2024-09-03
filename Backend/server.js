const express = require("express");
const mongoose = require("mongoose");
const ItemRoute = require("./Routes/ItemRoute.js")
const GetItemRoute = require("./Routes/GetItemRoute.js")
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
app.use('/getitems',GetItemRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
 
const express = require("express");
const client_router = express.Router();
const ClientController = require("../Controllers/ClientController");

client_router.post("/", ClientController.addInquiry);
client_router.get("/", ClientController.getAllInquiries);
client_router.get("/:id", ClientController.getInquiryById);
client_router.put("/:id", ClientController.updateInquiry);
client_router.delete("/:id", ClientController.deleteInquiry);
client_router.post("/validate", ClientController.validateInquiry);

module.exports = client_router;

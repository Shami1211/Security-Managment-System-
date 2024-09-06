const express = require("express");
const operationRouter = express.Router();
const OperationController = require("../Controllers/OperationController");

operationRouter.post("/", OperationController.addOperation);
operationRouter.get("/", OperationController.getAllOperations);
operationRouter.get("/:id", OperationController.getOperationById);
operationRouter.put("/:id", OperationController.updateOperation);
operationRouter.delete("/:id", OperationController.deleteOperation);

module.exports = operationRouter;

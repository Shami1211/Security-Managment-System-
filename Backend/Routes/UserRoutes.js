const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserControllers");

router.get("/", UserController.getAllUser);
router.post("/", UserController.addUser);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.post("/login", UserController.loginUser);


module.exports = router;

const express = require("express");
const router = express.Router();
//Insert Controller
const UserController = require("../Controllers/UserControllers");

router.get("/", UserController.getAllUser);
router.post("/", UserController.addUser);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

//export
module.exports = router;

const Employee = require("../Model/UserModel");


// Login User
const loginUser = async (req, res, next) => {
  const { type, gmail, name } = req.body;

  let user;
  try {
    user = await Employee.findOne({ type, gmail, name });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err });
  }

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials, please try again." });
  }

  return res.status(200).json({ message: "Login successful", user });
};


// Get all Users
const getAllUser = async (req, res, next) => {
  let emp;
  try {
    emp = await Employee.find();
  } catch (err) {
    console.log(err);
  }
  if (!emp) {
    return res.status(404).json({ message: "Employees not found" });
  }
  return res.status(200).json({ emp });
};

// Add a new User with validation
const addUser = async (req, res, next) => {
  const { type, name, gmail, address, phone } = req.body;

  let existingUser;
  try {
    existingUser = await Employee.findOne({ gmail });
  } catch (err) {
    return res.status(500).json({ message: "Error validating employee", error: err });
  }

  if (existingUser) {
    return res.status(400).json({ message: "User with this Gmail already exists" });
  }

  let emp;
  try {
    emp = new Employee({
      type,
      name,
      gmail,
      address,
      phone,
    });
    await emp.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error creating employee", error: err });
  }

  return res.status(201).json({ emp });
};

// Get User by ID
const getById = async (req, res, next) => {
  const id = req.params.id;

  let emp;
  try {
    emp = await Employee.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!emp) {
    return res.status(404).json({ message: "Employee Not Found" });
  }
  return res.status(200).json({ emp });
};

// Update User Details
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { type, name, gmail, address, phone } = req.body;

  let emps;
  try {
    emps = await Employee.findByIdAndUpdate(id, {
      type,
      name,
      gmail,
      address,
      phone,
    });
    emps = await emps.save();
  } catch (err) {
    console.log(err);
  }
  if (!emps) {
    return res.status(404).json({ message: "Unable to Update User Details" });
  }
  return res.status(200).json({ emps });
};

// Delete User Details
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let emp;
  try {
    emp = await Employee.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!emp) {
    return res.status(404).json({ message: "Unable to Delete User Details" });
  }
  return res.status(200).json({ emp });
};

exports.getAllUser = getAllUser;
exports.addUser = addUser;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;

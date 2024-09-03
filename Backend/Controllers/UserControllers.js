const Employee = require("../Model/UserModel");

const getAllUser = async (req, res, next) => {
  let emp;
  // Get all Employee
  try {
    emp = await Employee.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!emp) {
    return res.status(404).json({ message: "Employee not found" });
  }
  // Display all emp
  return res.status(200).json({ emp });
};

// data Insert
const addUser = async (req, res, next) => {
  const { type, name, gmail, address, phone } = req.body;

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

  if (!emp) {
    return res.status(404).json({ message: "Unable to add Employee" });
  }
  return res.status(200).json({ emp });
};


//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let emp;

  try {
    emp = await Employee.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available emps
  if (!emp) {
    return res.status(404).json({ message: "Employee Not Found" });
  }
  return res.status(200).json({ emp });
};

//Update emp Details
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { type,name, gmail, address, phone } = req.body;

  let emps;

  try {
    emps = await Employee.findByIdAndUpdate(id, {
      type: type,
      name: name,
      gmail: gmail,
      address: address,
      phone: phone,
    });
    emps = await emps.save();
  } catch (err) {
    console.log(err);
  }
  if (!emps) {
    return res
      .status(404)
      .json({ message: "Unable to Update User Details" });
  }
  return res.status(200).json({ emps });
};

//Delete emp Details
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let emp;

  try {
    emp = await Employee.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!emp) {
    return res
      .status(404)
      .json({ message: "Unable to Delete User Details" });
  }
  return res.status(200).json({ emp });
};

exports.getAllUser = getAllUser;
exports.addUser = addUser;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

const Client = require("../Model/Client");

const addInquiry = async (req, res, next) => {
  try {
    // Check if email already exists
    const existingClient = await Client.findOne({ email: req.body.email });
    if (existingClient) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newInquiry = new Client(req.body);
    await newInquiry.save();
    res.status(201).json({ newInquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllInquiries = async (req, res, next) => {
  try {
    const inquiries = await Client.find();
    res.status(200).json({ inquiries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await Client.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json({ inquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateInquiry = async (req, res, next) => {
  try {
    const updatedInquiry = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedInquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json({ updatedInquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteInquiry = async (req, res, next) => {
  try {
    const deletedInquiry = await Client.findByIdAndDelete(req.params.id);
    if (!deletedInquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.status(200).json({ deletedInquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiry,
  deleteInquiry,
};

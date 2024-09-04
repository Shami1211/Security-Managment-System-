const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
  courseCategory: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // e.g., "3 months", "6 weeks"
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  details: {
    type: String, // Additional details about the course
  },
  security: {
    type: String, // Information about trainee security, e.g., "confidential"
    required: true,
  },
});

module.exports = mongoose.model("Training", TrainingSchema);

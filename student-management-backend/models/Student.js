const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]+$/.test(v); // Alphanumeric validation
      },
      message: (props) => `${props.value} is not alphanumeric!`,
    },
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email format validation
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  dob: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  enrollmentYear: {
    type: Number,
    required: true,
    min: 2000,
    max: new Date().getFullYear(), // Current year as of 2025
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
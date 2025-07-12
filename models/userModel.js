const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name should not be less than 5, and more than 100 characters long'],
    minlength: [5, 'Name should not be less than 5, and more than 100 characters long'],
    maxlength: [100, 'Name should not be less than 5, and more than 100 characters long'],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Please provide a valid email address'],
    unique: [true, 'Email already in use'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
	password: {
    type: String,
    required: true
  },
	preferences: { 
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
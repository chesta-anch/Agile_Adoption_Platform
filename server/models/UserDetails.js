const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  attemptCount: { 
    type: Number, 
    default: 0 
  },
  knowledgeLevel: {
    type: String,
    default: ''
  },
  completedModules: {
    type: Number,
    default: 0, // Initially, no modules are completed
  },
  totalModules: {
    type: Number,
    default: 10, // Assuming a default of 10 modules for everyone
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

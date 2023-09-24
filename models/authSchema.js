const mongoose = require('mongoose');

// Define the UserSchema
const UserSchema = new mongoose.Schema({
  username: {
    type: String, // Correct the type to 'String' (uppercase 'S')
    required: true,
  },
  email: {
    type: String, // Correct the type to 'String' (uppercase 'S')
    required: true,
  },
  pass: {
    type: String, // Correct the type to 'String' (uppercase 'S')
    required: true,
  },
  confirmepass: {
    type: String, // Correct the type to 'String' (uppercase 'S')
    required: true,
  },
});

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);

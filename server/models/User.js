// NOTE: Dummy MongoDB user model for demonstration
// Actual user data stored in Supabase profiles table

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  // Lost & Found specific fields
  itemsPosted: {
    type: Number,
    default: 0
  },
  itemsRecovered: {
    type: Number,
    default: 0
  },
  reputation: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Note: This model is for demonstration only
// Actual user management is handled by Supabase Auth

module.exports = mongoose.model('User', userSchema);
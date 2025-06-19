// NOTE: Dummy MongoDB item model for demonstration
// Actual item data stored in Supabase items table

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Lost', 'Found'],
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Personal Items', 'Documents', 'Clothing', 'Accessories', 'Other']
  },
  location: {
    type: String,
    required: true
  },
  dateLostFound: {
    type: Date,
    required: true
  },
  images: [{
    type: String // URLs to uploaded images
  }],
  status: {
    type: String,
    enum: ['Active', 'Recovered', 'Expired'],
    default: 'Active'
  },
  
  // Contact information
  contactName: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: String,
  
  // User who posted
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Recovery information
  recoveredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recoveredDate: Date,
  recoveredLocation: String,
  
  // Additional fields
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Note: This model is for demonstration only
// Actual item management is handled by Supabase

module.exports = mongoose.model('Item', itemSchema);
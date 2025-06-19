// NOTE: Dummy user routes for demonstration
// Actual user operations handled by Supabase

const express = require('express');
const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    res.json({
      id: 'dummy-user-id',
      name: 'Demo User',
      email: 'demo@example.com',
      avatar: null,
      itemsPosted: 5,
      itemsRecovered: 2,
      joinDate: '2024-01-01',
      note: 'This is dummy data - actual profile data from Supabase'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', async (req, res) => {
  try {
    const updateData = req.body;
    
    res.json({
      message: 'Profile updated successfully',
      user: updateData,
      note: 'This is a dummy response - actual operations in Supabase'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/my-items
// @desc    Get user's items
// @access  Private
router.get('/my-items', async (req, res) => {
  try {
    const dummyUserItems = [
      {
        id: '1',
        title: 'Lost Wallet',
        type: 'Lost',
        status: 'Active',
        datePosted: '2024-01-10'
      },
      {
        id: '2',
        title: 'Found Sunglasses',
        type: 'Found',
        status: 'Recovered',
        datePosted: '2024-01-12'
      }
    ];
    
    res.json({
      items: dummyUserItems,
      note: 'This is dummy data - actual user items from Supabase'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
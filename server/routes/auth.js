// NOTE: Dummy authentication routes for demonstration
// Actual auth is handled by Supabase

const express = require('express');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // This would normally:
    // 1. Validate input
    // 2. Check if user exists
    // 3. Hash password
    // 4. Create user in database
    // 5. Generate JWT token
    
    res.status(201).json({
      message: 'User registered successfully',
      note: 'This is a dummy response - actual auth handled by Supabase'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // This would normally:
    // 1. Validate input
    // 2. Find user by email
    // 3. Compare password
    // 4. Generate JWT token
    
    res.json({
      message: 'Login successful',
      token: 'dummy-jwt-token',
      note: 'This is a dummy response - actual auth handled by Supabase'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', async (req, res) => {
  try {
    // This would normally verify JWT and return user data
    res.json({
      id: 'dummy-user-id',
      name: 'Demo User',
      email: 'demo@example.com',
      note: 'This is dummy data - actual user data from Supabase'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
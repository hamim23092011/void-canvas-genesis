// NOTE: Dummy item routes for demonstration
// Actual data operations handled by Supabase

const express = require('express');
const router = express.Router();

// @route   GET /api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
  try {
    // This would normally fetch from MongoDB
    const dummyItems = [
      {
        id: '1',
        title: 'Lost iPhone 14',
        description: 'Black iPhone 14 Pro lost near campus library',
        type: 'Lost',
        category: 'Electronics',
        location: 'University Library',
        date: '2024-01-15',
        status: 'Active'
      },
      {
        id: '2',
        title: 'Found Keys',
        description: 'Set of keys with Toyota keychain found in parking lot',
        type: 'Found',
        category: 'Personal Items',
        location: 'Main Parking Lot',
        date: '2024-01-16',
        status: 'Active'
      }
    ];
    
    res.json({
      items: dummyItems,
      note: 'This is dummy data - actual data stored in Supabase'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/items
// @desc    Create new item
// @access  Private
router.post('/', async (req, res) => {
  try {
    const itemData = req.body;
    
    // This would normally:
    // 1. Validate input
    // 2. Create item in database
    // 3. Return created item
    
    res.status(201).json({
      message: 'Item created successfully',
      item: { id: 'dummy-id', ...itemData },
      note: 'This is a dummy response - actual operations in Supabase'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/items/:id
// @desc    Update item
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    res.json({
      message: 'Item updated successfully',
      item: { id, ...updateData },
      note: 'This is a dummy response - actual operations in Supabase'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete item
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    res.json({
      message: 'Item deleted successfully',
      note: 'This is a dummy response - actual operations in Supabase'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
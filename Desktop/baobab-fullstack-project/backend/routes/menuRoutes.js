const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// GET all menu items
router.get('/', async (req, res) => {
  console.log('📞 GET /api/menu called');
  try {
    const menuItems = await MenuItem.find();
    console.log(`Found ${menuItems.length} menu items`);
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single menu item
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

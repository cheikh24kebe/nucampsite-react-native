// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');

// GET or create cart
router.get('/:sessionId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    
    if (!cart) {
      cart = new Cart({
        sessionId: req.params.sessionId,
        items: [],
        total: 0
      });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST add item to cart
router.post('/:sessionId/items', async (req, res) => {
  try {
    const { menuItemId, quantity = 1 } = req.body;
    
    // Find menu item
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem || !menuItem.available) {
      return res.status(404).json({ message: 'Menu item not available' });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) {
      cart = new Cart({ sessionId: req.params.sessionId, items: [] });
    }
    
    // Check if item exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.menuItemId.toString() === menuItemId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        quantity: quantity,
        price: menuItem.price
      });
    }
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: 'Error adding item to cart', error: error.message });
  }
});

// DELETE remove item from cart
router.delete('/:sessionId/items/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(
      item => item._id.toString() !== req.params.itemId
    );
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: 'Error removing item', error: error.message });
  }
});

module.exports = router;
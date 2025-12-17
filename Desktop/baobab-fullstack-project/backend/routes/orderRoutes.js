const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// POST create new order
router.post('/', async (req, res) => {
  console.log('📦 Received order:', req.body);
  try {
    const { customerName, customerEmail, customerPhone, items, totalAmount } = req.body;
    
    // Validate required fields
    if (!customerName || !customerEmail || !items || !totalAmount) {
      return res.status(400).json({ 
        error: 'Missing required fields: customerName, customerEmail, items, totalAmount' 
      });
    }
    
    const order = new Order({
      customerName,
      customerEmail,
      customerPhone: customerPhone || '',
      items,
      totalAmount,
      status: 'pending'
    });
    
    const savedOrder = await order.save();
    console.log('✅ Order saved with ID:', savedOrder._id);
    
    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      orderId: savedOrder._id,
      order: savedOrder
    });
  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      details: error.message 
    });
  }
});

// GET order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all orders (for admin - optional)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
EOF

const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, default: '' },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    default: 'pending',
    enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled']
  }
});

module.exports = mongoose.model('Order', orderSchema);
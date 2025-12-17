// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'preparing', 'completed'], 
    default: 'pending' 
  },
  orderNumber: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Generate order number before saving
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
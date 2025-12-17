// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true }
    }
  ],
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Calculate total before saving
cartSchema.pre('save', function(next) {
  this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const mongoose = require('mongoose');

router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    console.error('Error en GET /cart:', err);
    res.status(500).json({ message: err.message });
  }
});

router.post('/:userId', async (req, res) => {
  const { productId, qty } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'productId inválido' });
    }

    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].qty = qty;
      if (qty <= 0) cart.items.splice(itemIndex, 1);
    } else if (qty > 0) {
      cart.items.push({ productId, qty });
    }
    await cart.save();
    const populatedCart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    res.json(populatedCart || { userId: req.params.userId, items: [] });
  } catch (err) {
    console.error('Error en POST /cart:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
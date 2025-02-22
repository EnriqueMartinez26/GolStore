const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const mongoose = require('mongoose');

router.get('/:userId', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId }).populate('productId');
    res.json(favorites.map(fav => fav.productId));
  } catch (err) {
    console.error('Error en GET /favorites:', err);
    res.status(500).json({ message: err.message });
  }
});

router.post('/:userId', async (req, res) => {
  const { productId } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'productId inválido' });
    }

    const existing = await Favorite.findOne({ userId: req.params.userId, productId });
    if (!existing) {
      const favorite = new Favorite({ userId: req.params.userId, productId });
      await favorite.save();
    }
    const favorites = await Favorite.find({ userId: req.params.userId }).populate('productId');
    res.json(favorites.map(fav => fav.productId));
  } catch (err) {
    console.error('Error en POST /favorites:', err);
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:userId/:productId', async (req, res) => {
  try {
    await Favorite.deleteOne({ userId: req.params.userId, productId: req.params.productId });
    const favorites = await Favorite.find({ userId: req.params.userId }).populate('productId');
    res.json(favorites.map(fav => fav.productId));
  } catch (err) {
    console.error('Error en DELETE /favorites:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
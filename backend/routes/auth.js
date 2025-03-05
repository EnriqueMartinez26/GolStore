const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });
    res.json({ message: 'Login exitoso', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Nueva ruta para obtener usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Modificación del manejo de conexión
let cachedConnection = null;

async function connectDB() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 segundos timeout
      socketTimeoutMS: 5000
    });
    
    cachedConnection = conn;
    return conn;
  } catch (err) {
    console.error('Error MongoDB:', err);
    throw err;
  }
}

// Modificar el middleware de conexión
app.use(async (req, res, next) => {
  try {
    if (!cachedConnection) {
      await connectDB();
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const favoriteRoutes = require('./routes/favorites');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', favoriteRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (!process.env.VERCEL_ENV) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

module.exports = app;

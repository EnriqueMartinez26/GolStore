const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Conectado a MongoDB');
    await Product.deleteMany(); // Limpia la colección
    await Product.insertMany([
      { name: 'Camiseta Boca Juniors', price: 60, image: 'https://via.placeholder.com/150', description: 'Camiseta oficial de Boca Juniors 2025' },
      { name: 'Camiseta River Plate', price: 70, image: 'https://via.placeholder.com/150', description: 'Camiseta oficial de River Plate 2025' },
      { name: 'Camiseta Argentina', price: 80, image: 'https://via.placeholder.com/150', description: 'Camiseta de la selección Argentina' },
    ]);
    console.log('Productos insertados');
    mongoose.connection.close();
  })
  .catch(err => console.error('Error:', err));
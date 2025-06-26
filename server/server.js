import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config.js';
import Product from './models/Product.js'; // Importera produktmodellen
import mongoose from 'mongoose';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // Anslut till MongoDB databasen

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB ansluten'))
  .catch(err => console.error('❌ Fel vid MongoDB-anslutning:', err));

// Middleware
app.use(cors());                  // Tillåter frontend att prata med backend
app.use(express.json());          // Tolkar inkommande JSON i requests

// Test-route (hälsning)
app.get('/api/create-test-products', async (req, res) => {
  try {
    // Rensa gamla produkter (valfritt)
    await Product.deleteMany({});

    // Skapa nya produkter
    const products = [
      {
        title: 'A3 Poster',
        description: 'Högkvalitativ A3 poster för väggdekoration',
        image: 'https://via.placeholder.com/150',
        price: 199,
        options: [
          { size: 'A3', paper: 'Matt', finish: 'Matt' },
          { size: 'A3', paper: 'Glansigt', finish: 'Glans' }
        ]
      },
      {
        title: 'Bröllopsalbum',
        description: 'Vackert album för bröllopsbilder',
        image: 'https://via.placeholder.com/150',
        price: 799,
        options: [
          { size: '30x30 cm', paper: 'Fotopapper', finish: 'Matt' },
          { size: '30x30 cm', paper: 'Fotopapper', finish: 'Glans' }
        ]
      }
    ];

    await Product.insertMany(products);
    res.send('Testprodukter skapade!');
  } catch (err) {
    res.status(500).send('Fel vid skapande av testprodukter');
  }
});

// Hämta alla produkter
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Fel vid hämtning av produkter' });
  }
});



// Starta servern
app.listen(PORT, () => {
  console.log(`Servern kör på port ${PORT}`);
});

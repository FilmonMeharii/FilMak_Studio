import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config.js';
import Product from './models/Product.js';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import Order from './models/Order.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB ansluten'))
  .catch((err) => console.error('❌ Fel vid MongoDB-anslutning:', err));

// Middleware
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

// Skapa testprodukter
app.get('/api/create-test-products', async (req, res) => {
  try {
    await Product.deleteMany({});

    const products = [
      {
        title: 'Bröllopsalbum',
        description: 'Vackert album för bröllopsbilder',
        image: 'https://via.placeholder.com/150',
        price: 799,
        category: 'Album',
        options: [
          { size: '30x30 cm', paper: 'Fotopapper', finish: 'Matt' },
          { size: '30x30 cm', paper: 'Fotopapper', finish: 'Glans' },
        ],
      },
      {
        title: 'Dop-poster',
        description: 'Söt poster för dop och barnkalas',
        image: 'https://via.placeholder.com/150',
        price: 149,
        category: 'Dop',
        options: [
          { size: 'A4', paper: 'Matt', finish: 'Matt' },
          { size: 'A3', paper: 'Glansigt', finish: 'Glans' },
        ],
      },
      {
        title: 'Bröllops-poster',
        description: 'Elegant poster för bröllop',
        image: 'https://via.placeholder.com/150',
        price: 199,
        category: 'Bröllop',
        options: [
          { size: 'A3', paper: 'Matt', finish: 'Matt' },
          { size: 'A2', paper: 'Glansigt', finish: 'Glans' },
        ],
      },
      {
        title: 'Väggbild',
        description: 'Fin bild för vardagsrummet',
        image: 'https://via.placeholder.com/150',
        price: 129,
        category: 'Poster',
        options: [
          { size: 'A4', paper: 'Matt', finish: 'Matt' },
          { size: 'A3', paper: 'Glansigt', finish: 'Glans' },
        ],
      },
    ];

    await Product.insertMany(products);
    res.send('Testprodukter skapade!');
  } catch (err) {
    res.status(500).send('Fel vid skapande av testprodukter');
  }
});


// Hämta alla produkter eller filtrera på kategori via query param
app.get('/api/products', async (req, res) => {
  try {
    const category = req.query.category;
    let products;
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find({});
    }
    res.json(products);
  } catch (err) {
    res.status(500).send('Fel vid hämtning av produkter');
  }
});

app.post('/api/order', upload.single('image'), async (req, res) => {
  try {
    const { product, size, type, text, email } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const order = new Order({ product, size, type, text, imageUrl, email });
    await order.save();
    res.status(201).json({ message: 'Beställning mottagen!', order });
  } catch (err) {
    res.status(500).json({ error: 'Fel vid beställning' });
  }
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern kör på port ${PORT}`);
});

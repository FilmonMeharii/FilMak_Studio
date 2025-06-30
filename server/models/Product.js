import mongoose from 'mongoose';


const optionSchema = new mongoose.Schema({
  size: String,
  paper: String,
  finish: String,
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String, // URL eller filnamn
  price: { type: Number, required: true },
  category:String, // T.ex. "Poster", "Album"
  options: [
    {
      size: String,
      paper: String,
      finish: String
    }
  ]
});

const Product = mongoose.model('Product', productSchema);


export default Product;
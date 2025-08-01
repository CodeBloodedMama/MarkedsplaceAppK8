import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['electronics', 'clothing', 'home']
  },
  image: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  sellerId: {
    type: String
  },
  sellerName: {
    type: String
  }
});

const ProductModel = model('products', ProductSchema);
export default ProductModel;

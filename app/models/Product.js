const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        data: Buffer,
        contentType: String
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

module.exports = Product = mongoose.model('products', ProductSchema);
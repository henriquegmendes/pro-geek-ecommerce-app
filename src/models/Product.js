const mongoose = require('mongoose');

const { Schema } = mongoose;

const mySchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  leadTime: Number,
<<<<<<< HEAD
  image: {
    type: Array,
    default: ['https://res.cloudinary.com/dobzwgcvl/image/upload/v1552593758/pro-geek-ecommerce/product-pictures/default.png']
  },
=======
  image: [{
    type: String,
    default: 'https://res.cloudinary.com/dobzwgcvl/image/upload/v1552593758/pro-geek-ecommerce/product-pictures/default.png'
  }],
>>>>>>> 4cadbdddbc82b383f9e60686a121f8ddbbb196d1
  description: String,
  material: String,
  height: String,
  manufacturer: String,
  rating: [Object],
  category: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Product = mongoose.model('Product', mySchema);
module.exports = Product;

const mongoose = require('mongoose');

const { Schema } = mongoose;

const mySchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  leadTime: Number,
  image: [{
    type: String,
    default: 'https://screenshotlayer.com/images/assets/placeholder.png'
  }],
  description: String,
  material: String,
  height: String,
  manufacturer: String,
  rating: [{
    type: Schema.Types.ObjectId,
    ref: 'Evaluation'
  }],
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
  }
);

const Product = mongoose.model('Product', mySchema);

module.exports = Product;

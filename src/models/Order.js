const mongoose = require('mongoose');

const { Schema } = mongoose;

const mySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    type: Object,
    required: true
  }],
  status: {
    type: String,
    default: 'In production'
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Order = mongoose.model('Order', mySchema);
module.exports = Order;

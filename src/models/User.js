const mongoose = require('mongoose');

const { Schema } = mongoose;

const mySchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  birthDate: { type: String },
  password: { type: String, required: true },
  address: {
    type: Object,
    default: {
      street: '',
      complement: '',
      postalCode: ''
    }
  },
  userAvaliations: Array,
  userOrders: Array,
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User'
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', mySchema);

module.exports = User;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/Product.js');

// GET
router.get('/', (req, res, next) => {
  Product.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      throw new Error(error);
    });
});

// GET:id
router.get('/:id', (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {

    });
});

// PUT
router.put('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const { name, price, leadTime, image, description, material, height, manufacturer, category } = req.body;

  Product.findOneAndUpdate({ _id: req.params.id }, { $set: { name, price, leadTime, image, description, material, height, manufacturer, category: [] } })
    .then(() => {
      Product.findOneAndUpdate({ _id: req.params.id }, { $push: { category } })
        .then((product) => {
          res.json({ message: 'Successfully Updated' })
        })
        .catch(err => res.status(400).json(err))
    })
    .catch(err => {
      res.status(400).json(err)
      //  throw new Error(err);
    });

})


// DELETE
router.delete('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json({
        message: 'Successfully Deleted'
      })
    });
});



// POST
router.post('/', (req, res, next) => {
  const { name, price, leadTime, image, description, material, height, manufacturer, category } = req.body;

  if (name === '' || price === '') {
    res.status(400).json({ message: 'Please fill name and price fields' })
  }

  const newProduct = new Product({
    name,
    price,
    leadTime,
    image,
    description,
    material,
    height,
    manufacturer,
    category
  });



  newProduct.save((err) => {
    if (err) {
      res.status(400).json({ message: err });
      return;
    }
    res.status(200).json({ message: 'New product created' })
    return;
  });
});

module.exports = router;

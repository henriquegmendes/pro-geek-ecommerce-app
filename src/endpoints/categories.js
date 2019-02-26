const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Category = require('../models/Category.js');

// GET
router.get('/', (req, res, next) => {
  Category.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      throw new Error(error);
    });
});

// GET:id
router.get('/:id', (req, res, next) => {
  Category.findOne({ _id: req.params.id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {

    });
});

//PATCH


// DELETE
router.delete('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Category.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json({
        message: 'Successfully Deleted'
      })
    });
});


// POST
router.post('/', (req, res, next) => {
  const { name } = req.body;

  const newCategory = new Category({
    name
  });

  newCategory.save((err) => {
    if (err) {
      res.status(400).json({ message: err });
      return;
    }
    res.status(200).json({ message: 'New Category created' })
    return;
  });
});

module.exports = router;

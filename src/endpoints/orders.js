const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Order = require('../models/Order.js');

// GET
router.get('/', (req, res, next) => {
  Order.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((error) => {
      throw new Error(error);
    });
});

// GET:id
router.get('/:id', (req, res, next) => {
  Order.findOne({ _id: req.params.id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {

    });
});

// // PUT
// router.put('/:id', (req, res, next) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   Order.findOneAndUpdate({ _id: req.params.id }, req.body)
//     .then((product) => {
//       res.json({ message: 'Successfully Updated' })
//     })
//     .catch(err => {
//       res.json(err)
//       //  throw new Error(err);
//     });
// })


// // DELETE
// router.delete('/:id', (req, res, next) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   Order.findOneAndRemove({ _id: req.params.id })
//     .then(() => {
//       res.json({
//         message: 'Successfully Deleted'
//       })
//     });
// });



// // POST - SIGNUP
// router.post('/', (req, res, next) => {
//   const { userId, products } = req.body;

//   const newOrder = new Product({
//     userId,
//     products,
//     status: 'produção'
//   });

//   newOrder.save((err) => {
//     if (err) {
//       res.status(400).json({ message: err });
//       return;
//     }
//     res.status(200).json({ message: 'New product created' })
//     return;
//   });
// });

module.exports = router;

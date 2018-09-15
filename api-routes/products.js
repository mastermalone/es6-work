module.exports = {
    init: () => {
      const express = require('express');
      const router = express.Router();
      const Product= require('./models/products');
      const mongoose = require('mongoose');
      
      router.get('/:id', (req, res, next) => {
        const id = req.params.id;
        
        Product.findById(id)
        .exec()
        .then(doc => {
          console.log('Here is the product', doc);
          res.status(200).json(doc);
        })
        .catch(error => {
          console.log('An error occured finding that id: ', error);
          res.status(500).json({
            error: error
          });
        });        
      });
      
      router.patch('/:id', (req, res, next) => {
        res.status(200).json({
          message: 'You updated the product! Updated item:'+req.params.id
        });
      });
      
      router.delete('/:id', (req, res, next) => {
        res.status(200).json({
          message: 'You deleted the product! Deleted item:'+req.params.id
        });
      });
      
    //Status code 201 means the creation of the data was successful
      router.post('/', (req, res, next) => {
        //Create new product object
        
        //Use the Product schema as a model for use in storing things to mongo db in an expected format
        const product = new Product({
          _id: new mongoose.Types.ObjectId(), //Mongoose creates a unique ID
          name: req.body.name,
          price: req.body.price
        });
        
        product.save()
        .then((result) => {
          console.log('You just saved', result);
        })
        .catch(error => console.log('A Save Error ocurred:', error));
        
        //Make sure to return the product object in the response
        res.status(201).json({
          message: 'Handling POST product requests',
          created_product: product
        });
      });
      return router;
    }
}

//Both of these work
//const express = require('express');
//const router = express.Router();
//router.get('/', (req, res, next) => {
//  res.status(200).json({
//    message: 'Handling GET product requests'
//  });
//});
//
//router.post('/', (req, res, next) => {
//  res.status(200).json({
//    message: 'Handling POST product requests'
//  });
//});
//module.exports = router;





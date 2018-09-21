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
          if (doc) {
            const response = {
                product: {
                  name: doc.name,
                  price: doc.price,
                  request: {
                    type: 'GET',
                    description: 'Get all products via: '+req.get('host')+'/products/'
                  }
                }
            }
            res.status(200).json(response);
          }else {
            res.status(404).json({
              error: 'The ID does not exist'
            });
          }
          //res.status(200).json(doc);
        })
        .catch(error => {
          console.log('An error occured finding that id: ', error);
          res.status(500).json({
            error: error
          });
        });        
      });
      
      router.get('/', (req, res) => {
        Product.find()
        .select('name price _id') //Filter the data that you want to return in the response.  This is optional but works well
        .exec()
        .then(doc => {
          if (doc.length >= 0) {
            //You can taylor the response to look however you wish as seen below with the 'response' object.  
            //Always be descriptive on the data you return from your API's so that others who use it know how to ise it
            const response = {
                count: doc.length,
                products: doc.map((prod, idx, array) => {
                  return {
                    _id: prod._id,
                    name: prod.name,
                    price: prod.price,
                    request: {
                      type: 'GET',
                      url: req.get('host')+'/products/'+prod._id //This is a good way to send a response to make it easier for the API consumer to use your API
                    }
                  }
                })
            }
            res.status(200).json(response);
          }else {
            res.status(200).json({
              _id: 0,
              name: "No Product Found",
              price: 0
            });
          }
          
        })
        .catch(err => {
          res.status(500).json({error: err});
        });
      });
      
      router.patch('/:id', (req, res, next) => {
        const id = req.params.id;
        const updateObj = {}; //Create an empty object that we can use to hold the value of the product properties we want to update
        
        //Loop through the req.body that was sent to the endpoint. For this to work, you must send an array
        //to the endpoint that contains an object with the keys called propName and value
        /*
         * Example req body array to pass
         * [
         *    { "propName": "name", "value": "The new Value" } 
         * ]
         */
        for (const prop of req.body) {
          updateObj[prop.propName] = prop.value;
        }
        
        Product.update({_id: id}, {$set: updateObj})
        .exec()
        .then((result) => {
          console.log('UPDATED:', result);
          res.status(200).json(result);
        })
        .catch(error => {
          console.log('Update Error: ', error);
          res.status(500).json({error: error})
        });
        
      });
      
      router.delete('/:id', (req, res, next) => {
        const id = req.params.id;
        
        Product.find({"_id": id})
        .select('_id')
        .exec()
        .then(result => {
          console.log('THE RESULT', result);
          const deletedProduct = {
              product: result
          }
          
          if (result.length > 0) {
            Product.deleteOne({_id: id})
            .exec()
            .then(result => {
              console.log('deleted product:', deletedProduct);
              
              res.status(200).json(result);
            })
            .catch(error => {
              res.status(500).json({
                error: error
              });
            });
            res.status(200).json(deletedProduct);
          }else {
            res.status(404).json({
              error: 'The ID:'+id+' could not be found'
            })
          }
        })
        .catch(err => {
          res.status(500).json({
            erro: err
          });
        });
      });
      
      //Status code 201 means the creation of the data was successful
      /*
       * Example req.body to send to the POST to create a new product
       * {
            "name": "White Fang",
            "price": "12.99"
         }
       */
      router.post('/', (req, res, next) => {
        //Create new product object
        
        //Use the Product schema as a model for use in storing things to mongo db in an expected format
        const product = new Product({
          _id: new mongoose.Types.ObjectId(), // Mongoose creates a unique ID
          name: req.body.name,
          price: req.body.price
        });
        
        product.save()
        .then((result) => {
          console.log('You just saved', result);
          //Make sure to return the product object in the response
          res.status(201).json({
            message: 'Handling POST product requests',
            created_product: {
              name: result.name,
              price: result.price,
              request: {
                type: 'POST',
                url: req.get('host')+'/products/'+result._id//This information is more useful to the front end and can be used more efficiently
              }
            }
          });
        })
        .catch(error => {
          console.log('A Save Error ocurred:', error);
          res.status(500).json({
            error: error
          });
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





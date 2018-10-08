module.exports = {
    init: () => {
      const express = require('express');
      const router = express.Router();
      const mongoose = require('mongoose');
      const Order = require('./models/orders');
      const Product = require('./models/products');
      
      router.get('/', (req, res) => {
        Order.find()
        .select('product quantity _id')
        .exec()
        .then(docs => {
          res.status(200).json({
            count: docs.length,
            orders: docs.map(doc =>{
              return {
                _id: doc._id,
                product: doc.product,
                quantity: doc.quantity,
                request: {
                  type: 'GET',
                  url: req.get('host')+'/orders/'+doc._id
                }
              }
            })
          });
        })
        .catch(err => {
          res.statis(500).json({
            error: err
          });
        });
      });
      
      //Status code 201 means the creation of the data was successful
      router.post('/', (req, res) => {
        //Check if product exists before creating a new order
        Product.findById(req.body.productId)
        .then(prod => {
          if (!prod) {
            return res.status(404).json({
              message: 'Product not found'
            });
          }
          const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
          });
          
          return order.save();
        })
        .then( result => {
          res.status(201).json({
            message:'Order for '+ result.product + ' stored.',
            created_order: {
              _id: result._id,
              product: result.product,
              quantity: req.body.quantity
            },
            request: {
              type: 'POST',
              url: req.get('host')+'/orders/'+result._id
            }
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'This product does not exist',
            error: err
          });
        })  
      });
      
      router.get('/:id', (req, res) => {
        Order.findById(req.params.id)
        .exec()
        .then(ord => {
          if (!ord) {
            return res.status(404).json({
              message: 'Order not found'
            })
          }
          res.status(200).json({
            message: 'Order found for'+ord.id,
            order: ord,
            request: {
              type: 'GET',
              url: req.get('host')+'/orders/'
            }
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'No order found',
            error: err
          });
        });
      });
      
      router.delete('/:id', (req, res) => {
        Order.findById({_id: req.params.id}).
        then(ord => {
          if (!ord) {
            return res.status(404).json({
              message: 'Order for ID: '+req.params.id+ ' could not be found'
            });
          }
          Order.remove({_id: req.params.id})
          .then(result => {
            res.status(200).json({
              message: 'Order Deleted',
              request: {
                type: 'POST',
                url: req.get('host')+'/orders/',
                body: {
                  product_id: req.params.is,
                  quantity: result.quantity
                }
              }
            });
          });
        })
        .catch(err=> {
          res.status(500).json({
            message: 'Could not Delete order with ID:'+ req.params.id,
            error: err
          })
        })
      });
      
      return router;
    }
}
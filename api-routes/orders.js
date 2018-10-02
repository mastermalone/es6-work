module.exports = {
    init: () => {
      const express = require('express');
      const router = express.Router();
      const mongoose = require('mongoose');
      const Order = require('./models/orders');
      
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
          //res.status(201).json(orders);
        })
        .catch(err => {
          res.statis(500).json({
            error: err
          });
        });
      });
      
      //Status code 201 means the creation of the data was successful
      router.post('/', (req, res) => {
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
      
        order.save()
        .then( result => {
          res.status(201).json(result);
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
      });
      
      router.get('/:id', (req, res) => {
        res.status(200).json({
          messgage: 'Here is the order for: '+req.params.id,
          order_id: req.params.id
        });
      });
      
      router.delete('/:id', (req, res) => {
        res.status(200).json({
          messgage: 'The order was deleted: '+req.params.id,
          order_id: req.params.id
        });
      });
      
      return router;
    }
}
module.exports = {
    init: () => {
      const express = require('express');
      const router = express.Router();
      
      router.get('/', (req, res) => {
        res.status(200).json({
          messgage: 'Orders were fetched'
        });
      });
      
      //Status code 201 means the creation of the data was successful
      router.post('/', (req, res) => {
        const order = {
            product_id: req.body.productId,
            quantity: req.body.quantity
        };
        //Make sure to return the order object in the response
        res.status(201).json({
          messgage: 'Order was created',
          order: order
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
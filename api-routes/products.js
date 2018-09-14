module.exports = {
    init: () => {
      const express = require('express');
      const router = express.Router();
      router.get('/:id', (req, res, next) => {
        
        if (!req.params.id) {
          res.status(200).json({
            error: 'You did not supply an ID' //not working
          });
          return;
        }
        res.status(200).json({
          message: 'Handling GET product requests.  The id:'+req.params.id
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
      
      router.post('/', (req, res, next) => {
        res.status(200).json({
          message: 'Handling POST product requests'
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





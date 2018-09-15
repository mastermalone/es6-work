module.exports.server = (function expressServer() {
  'use strict';
 
  const Server = {
      init: function expressServerInt(domain, port, appRoot) {
        const https = require('https');
        const express = require('express');
        const portX = port || 3000;
        const domainX = domain || 'localhost';
        const connect = require('connect');
        const svStatic = require('serve-static');
        const vhost = require('vhost');
        const path = require('path');
        const pem = require('pem');
        const serve = svStatic('./');
        const liverelaod = require('livereload');
        const appRoutes = require('../custom_modules/routes/routes');
        const products = require('../api-routes/products');
        const orders = require('../api-routes/orders');
        const app = express();
        const morgan = require('morgan');
        const bodyParser = require('body-parser');
        const mongoose = require('mongoose');
        appRoutes.init(app, appRoot);
        app.use(express.static(path.join((__dirname, './')))); //This is so that you can load javascript and CSS files
        
        
        mongoose.connect('mongodb://localhost/products_db', {
          useNewUrlParser: true
        });
        
        /*
         * For logging purposes to show you waht action took place on your endpoint, use morgan.  It shows up in the
         * the terminal where the server is running
         */
        app.use(morgan('dev'));
        
        /*
         * Body parser is used to parse the mostly unreadable data from incoming requests to my endpoints.
         * We can use that data by converting it to JSON format or URL encoded
         * We can now use the body parser in our routes
         */
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        
        /*
         * CORS HEADERS (Cross Origin Resource Sharing)
         * I need to give access to this endpoint to external clients that may not be on the 
         * same server as my endpoints.  The header needs  key 'Access-Control-Allow-Origin" and a value '*",
         * You can restrict it to something like, 'Access-Control-Allow-Origin" and a value 'http://mysite-only.com",
         * but that goes agains the RESTful API conventions since RESTful API's are generally open to all
         * All this is done to ensure that we prevent CORS Errors.
         */
        app.use((req, res, next) => {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
          
          /*
           * If the request meath matches the supplied header options
           */
          if (req.method === 'OPTIONS') {
            //Create another header to indicate which HTTP methods you are going to allow for your endpoints
            res.header('Access-Control-Alow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            //Return an empty json object because this request does not need to go to the routes below
            return res.status(200).json({});
          }
          //You must call next() so that the other routes below can take over the execution from this point on. Your request will stall otherwise
          next();
        });
        
        //API Routes
        app.use('/products', products.init());
        app.use('/orders', orders.init());
        
        /*
         * Error handling occurs here if the above routes are executed yet, the handlers they contain do not stop
         * the program as they normally would with the res.status(200).json({message: data}); If the program
         * reaches the line below, an error has occured and it needs to be handled.
         */
        app.use((req, res, next) => {
          const error = new Error('Item not found');
          error.status = 404;
          next(error);
        });
        
        /*
         * This will handle all types of errors, even those generated by a database.  It takes
         * the error that was created in the previous error handler because the error I created
         * above is forwarded via the next(error) function.  
         * 
         */
        app.use((error, req, res, next) => {
          res.status(error.status || 500);
          res.json({
            error: {
              message: error.message
            }
          });
        });
        
        app.listen(portX);
        console.log("Server is listening on port:", portX);
      }
  }
  return Server;
}());
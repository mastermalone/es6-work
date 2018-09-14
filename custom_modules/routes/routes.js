module.exports = (function appRoutes() {
  'use strict';
  let AppRoutes = {
      init: function appRoutesInit(app) {
        const fs = require('fs');
        let options = {
            root: __dirname + '/../../',
            dotfiles: 'deny',
            headers: {
              'x-timestamp': Date.now(),
              'x-sent': true
            }
        }
        
        app.get('/', function getHomePage(req, res, next) {
          res.sendFile('index.html', options, function getHomePage(err) {
            if(err) {
              next(err);
            }else {
              console.log('Sent', 'Home Page index.html')
            }
          });
        });
        app.get('/mike', function getHomePage(req, res, next) {
    	  res.sendFile('/mike/index.html', options, function getHomePage(err) {
            if(err) {
              next(err);
            }else {
              console.log('Sent', 'Home Page index.html')
            }
          });
        });
        
        //Breaks the endpoint get requests.  I can use this if I create a seperate server for the endpoints
        /*app.get('/:name', function getRoute(req, res, next) {
          if (fs.existsSync(req.params.name + '/index.html')) {
            res.sendFile(req.params.name + '/index.html', options, function getHtmlFile(err) {
              if(err) {
                next(err);
              }else {
                console.log('Sent', 'index');
              }
            });
          }else {
            return;
          }
        });*/
      }
  }
  
  return AppRoutes;
}());
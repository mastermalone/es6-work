module.exports.server = (function expressServer() {
  'use strict';
  //let appRoutes = require('./dev-server/routes').approutes;
 
  let Server = {
      init: function expressServerInt(domain, port) {
        let https = require('https');
        let express = require('express');
        let portX = port || 3000;
        let domainX = domain || 'localhost';
        let connect = require('connect');
        let svStatic = require('serve-static');
        let vhost = require('vhost');
        let path = require('path');
        let pem = require('pem');
        let serve = svStatic('./');
        let liverelaod = require('livereload');
        let appRoutes = require('../custom_modules/routes/routes');
        //let appRoutes = require('./dev-server/routes').approutes;
        //let path = require('path');
        
        var app = express();
        appRoutes.init(app);
        
       /* let options = {
            root: __dirname + '/../',
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
        //app.get('/mike', function mikeroute(req, res, next) {
        app.get('/:name', function getRoute(req, res, next) {
          
          let filePathName = req.params.name;
          
          //res.sendFile('index.html', options, function getHtmlFile(err) {
          res.sendFile(filePathName + 'index.html', options, function getHtmlFile(err) {
            if(err) {
              next(err);
            }else {
              console.log('Sent', 'index');
            }
          });
        });*/
        
        app.listen(portX);
        console.log("Server is listening on port:", port);
      }
  }
  return Server;
}());
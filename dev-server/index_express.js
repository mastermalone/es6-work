module.exports.server = (function expressServer() {
  'use strict';
 
  let Server = {
      init: function expressServerInt(domain, port, appRoot) {
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
        let app = express();
        appRoutes.init(app, appRoot);
        
        app.listen(portX);
        console.log("Server is listening on port:", port);
      }
  }
  return Server;
}());
module.exports.server = (function () {
    'use strict';
    
    var Server = {
        init: function (domain, port) {
          var https = require('https');
          var fs = require('fs');
          var proxied = require('https-proxied');
          var connectRouter = require('connect-route');
          //console.log('THE ROUTER', connectRouter);
          
          var portX = port || 3000;
          var domainX = domain || 'localhost';
          var connect = require('connect');
          var svStatic = require('serve-static');
          var vhost = require('vhost');
          var path = require('path');
          var pem = require('pem');
          var serve = svStatic('./');
          var liverelaod = require('livereload');
          var path = require('path');
          
          //this is for the site
          var siteApp = connect();
          //This is the main server used for routing
          var mainApp = connect(); 
          
          //siteApp.use(svStatic('./', {index:['index.html']}));
          //siteApp.use(svStatic(path.join(__dirname, '/../'), {index:['one/js/one_module/0.1/index.html']}));
          siteApp.use(svStatic(path.join(__dirname, '/../'), {index:['index.html']}));
          //siteApp.use(svStatic(path.join(__dirname, '/../'), {index:['js/one_module/0.1/index.html']}));
          mainApp.use(vhost(domainX, siteApp));
          mainApp.use(connectRouter( function router(router) {
            router.get('/mike', function mikeRoute(req, res, next) {
              res.end(path.join(__dirname, '/../'), {index:['index.html']});
              //res.end('Mike');
            });
          }));
          
          //app.use(vhost('member.localhost.cn', siteApp));
          mainApp.listen(portX);
          
          mainApp = liverelaod.createServer({
            port: 35730 //Kill this config object if you do not need to specify the port 35729 is the normal port.  Used a different number to avert LR port conflicts
          });
          //mainApp.watch([path.resolve(__dirname + "/../js"), path.resolve(__dirname + "/../one"), path.resolve(__dirname + "/../one/js")]);
          mainApp.watch([path.resolve(__dirname + "/../js"), path.resolve(__dirname + "/../"), path.resolve(__dirname + "/../js")]);
          console.log("Server is listening on port:", port);
          
          //HTTPS Server on 3002
          pem.createCertificate({
            days: 1,
            selfSigned: true
          }, function (err, keys) {
            var secureApp = https.createServer({
              key: keys.serviceKey,
              cert: keys.certificate
            }, vhost(domainX, siteApp));
            console.log(Object.keys(keys));
            secureApp.listen(portX+1);
            console.log('HTTP is running on ', portX+1);
          });
        }
    };
    
    return Server;
}());

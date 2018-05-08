module.exports.approutes = (function appRoutes() {
  'use strict';
  
  let AppRoutes = {
      init: function appRoutesInit(app) {
        let options = {
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
        });
      }
  }
  
  return AppRoutes;
}());
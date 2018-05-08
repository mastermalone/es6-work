(function () {
    'use strict';
    
    //var server = require('./dev-server/index').server;
    var server = require('./dev-server/index_express').server;
    
    server.init('localhost', 3001);
    
}());


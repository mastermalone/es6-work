(function () {
    'use strict';
    
    let server = require('./dev-server/index_express').server;
    
    server.init('localhost', 3001);
    
}());


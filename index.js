'use strict';

//Import libraries
var express = require('express');
var cors = require('cors');
var app = express();
var http = require('http');
var swaggerTools = require('swagger-tools');
const jwtTokenChecker = require('./middleware/jwttokenchecker').validateToken;

//To allow cors
app.use(cors());

//Diclare server port
var serverPort = 3009;


// swaggerRouter configuration
var options = {
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var swaggerDoc = require('./api/swagger.json');

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {


  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  app.use(middleware.swaggerSecurity({
    //manage token function in the 'auth' module
      Bearer: jwtTokenChecker
  }));
  
  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  });
});
// import core modules.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/angular_rest_api');

// import routes.
var router = express.Router();
require('./routes')(router);

// static file handler
app.use(express.static(__dirname + '/assets'));

// global middleware.
app.use([urlParser, jsonParser, router]);

// 404 handler.
app.use(function(req, res, next) {
    console.log('\n\n\n404 - ' + req.method + ' ' + req.url);
    res.status(404)
        .set('Content-Type', 'text/plain')
        .end('404 - ' + req.method + ' ' + req.url);
});

// 500 handler.
app.use(function(err, req, res, next) {
    console.log('\n\n\n500', err.message, err.stack);
    mongoose.disconnect();
    res.status(500)
        .set('Content-Type', 'text/plain')
        .end('500 - Server error');
});

app.listen(3000, function() {
    console.log('\n\n\nServer started...');
});
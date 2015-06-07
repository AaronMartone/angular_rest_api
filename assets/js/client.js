'use strict';

// include core modules;
require('angular/angular');

// create angular app.
var userApp = angular.module('userApp', []);

// inject app into controller.
require('./users/controllers/users-controller')(userApp);
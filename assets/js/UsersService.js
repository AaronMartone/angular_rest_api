'use strict';

(function() {

    var UsersService = function($http) {

        // execute delete via rest and return promise.
        this.deleteUser = function(_id) {
            return $http.delete('/users/' + _id);
        }

        // execute edit via rest and return promise.
        this.editUser = function(_id, requestBody) {
            return $http.put('/users/' + _id, requestBody);
        }

        // returns a promise from a rest call to get a list of all users.
        this.getUsers = function() {
            return $http.get('/users');
        };
    };

    // inject service dependencies.
    UsersService.$inject = ['$http'];

    // bind controller to app.
    angular.module('userApp')
        .service('UsersService', UsersService);

}());
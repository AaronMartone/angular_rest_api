'use strict';

(function() {

    var UsersService = function($http) {

        // return a promise of creating a user.
        this.createUser = function(requestBody) {
            return $http.post('/api/users', {
                username: requestBody.username,
                name: {
                    last: requestBody.name.last,
                    first: requestBody.name.first
                },
                email: requestBody.email
            });
        };

        // return a promise of destroying a user.
        this.destroyUser = function(_id) {
            return $http.delete('/api/users/' + _id);
        };

        // return a promise of retrieved users.
        this.retrieveUsers = function() {
            return $http.get('/api/users');
        };

        // return a promise of updating a user.
        this.updateUser = function(_id, requestBody) {
            return $http.put('/api/users/' + _id, {
                username: requestBody.username,
                name: {
                    last: requestBody.name.last,
                    first: requestBody.name.first
                },
                email: requestBody.email
            });
        };

    };

    // inject service dependencies and bind service to app.
    UsersService.$inject = ['$http'];

    angular.module('usersApp')
        .service('UsersService', ['$http', UsersService]);

}());
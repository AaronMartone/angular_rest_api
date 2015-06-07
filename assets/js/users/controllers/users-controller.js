'use strict';

module.exports = function(app) {
    app.controller('userController', ['$scope', '$http', function($scope, $http) {
        $scope.errors = [];
        $scope.users = [];

        $scope.getUsers = function() {
            $http.get('/users')
            .success(function(data) {
                $scope.users = data;
            })
            .error(function(data) {
                console.log(data);
                $scope.errors.push({
                    message: 'error getting list of users'
                });
            });
        };

        $scope.createUser = function() {
            $http.post('/users', $scope.newUser)
            .success(function(data) {
                $scope.users.push(data);
                $scope.newUser = null;
            })
            .error(function(data) {
                console.log(data);
                $scope.errors.push({
                    message: 'error creating a new User'
                });
            });
        };

        $scope.createUser = function() {
            $http.post('/users', $scope.newUser)
            .success(function(data) {
                $scope.users.push(data);
                $scope.newUser = null;
            })
            .error(function(data) {
                console.log(data);
                $scope.errors.push({
                    message: 'error creating a new User'
                });
            });
        };

        $scope.deleteUser = function(user) {
            $scope.users.splice($scope.users.indexOf(user), 1);
            $http.delete('/users/' + user._id)
            .error(function(data) {
                console.log(data);
                $scope.errors.push({
                    message: 'error deleting User'
                });
            });
        };

        $scope.updateUser = function(user) {
            user.editing = false;
            $http.put('/users/' + user._id, user)
            .error(function(data) {
                console.log(data);
                $scope.errors.push({
                    message: 'error updating User'
                });
            });
        };

        $scope.clearErrors = function() {
            $scope.errors = [];
            $scope.getUsers();
        };

    }]);

};
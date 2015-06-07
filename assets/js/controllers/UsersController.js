'use strict';

(function() {

    var UsersController = function($scope, UsersService) {

        $scope.users = [];
        $scope.view = 'list';
        $scope.editID = null;

        // expose controller functionality.
        $scope.addUser = addUser;
        $scope.cancelAction = cancelAction;
        $scope.createUser = createUser;
        $scope.destroyUser = destroyUser;
        $scope.editUser = editUser;
        $scope.retrieveUsers = retrieveUsers;
        $scope.updateUser = updateUser;

        // initializes the controller.
        function init() {

            $scope.retrieveUsers();            
            setViewState('list');

        }

        init();

        // modify the view model to prepare for user creation.
        function addUser() {
            
            $scope.editID = null;
            $scope.username = '';
            $scope.lastname = '';
            $scope.firstname = '';
            $scope.email = '';
            setViewState('add');

        }   

        // cancel the current add/edit action and return to a list view state.
        function cancelAction() {

            $scope.editID = null;
            setViewState('list');

        }

        // creates a new user.
        function createUser() {

            UsersService.createUser({
                username: $scope.username,
                name: {
                    last: $scope.lastname,
                    first: $scope.firstname
                },
                email: $scope.email
            })
                .success(function(result) {
                    console.log('User created successfully.');
                    $scope.retrieveUsers();
                })
                .error(function(result, status) {
                    handleError(result, status);
                });            
            setViewState('list');

        }

        // deletes the specified user.
        function destroyUser(id) {

            UsersService.destroyUser($scope.users[id]._id)
                .success(function(result) {
                    console.log('User deleted successfully.')
                    $scope.retrieveUsers();
                })
                .error(function(result, status) {
                    handleError(result, status);
                });

        }

        // modify the view model to prepare for user updating.
        function editUser(id) {
            
            $scope.editID = id;
            $scope.username = $scope.users[id].username;
            $scope.lastname = $scope.users[id].name.last;
            $scope.firstname = $scope.users[id].name.first;
            $scope.email = $scope.users[id].email;
            setViewState('edit');

        }

        // handle errors in returned promises from the user service.
        function handleError(result, status) {

            console.log('Error: ' + status, result);

        }

        // retrieve a list of users.
        function retrieveUsers() {

            UsersService.retrieveUsers()
                .success(function(result) {
                    $scope.users = result.data;
                })
                .error(function(result, status) {
                    handleError(result, status);
                });

        }

        // sets the view state to the one specified.
        function setViewState(state) {

            $scope.viewState = state;

        }

        // updates the specified user.
        function updateUser() {

            UsersService.updateUser($scope.users[$scope.editID]._id, {
                username: $scope.username,
                name: {
                    last: $scope.lastname,
                    first: $scope.firstname
                },
                email: $scope.email
            })
                .success(function(result) {
                    console.log('User updated successfully.');
                    $scope.editID = null;
                    $scope.retrieveUsers();
                    setViewState('list');
                })
                .error(function(result, status) {
                    handleError(result, status);
                });

        }

    };

    // inject controller dependencies and bind the controller to the app.
    UsersController.$inject = ['$scope', 'UsersService'];

    angular.module('usersApp')
        .controller('UsersController', ['$scope', 'UsersService', UsersController]);

}());
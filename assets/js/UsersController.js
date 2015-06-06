'use strict';

(function() {

    var UsersController = function($scope, UsersService) {

        $scope.users = [];
        $scope.view = 'list';
        $scope.editID = null;
        $scope.addUser = addUser;
        $scope.cancelAction = cancelAction;
        $scope.deleteUser = deleteUser;
        $scope.editUser = editUser;
        $scope.saveUser = saveUser;
        $scope.updateUsersList = updateUsersList;

        // initializes the controller.
        function init() {

            // populate the scope's users list.
            $scope.updateUsersList();            

        }

        init();

        // modify the view state to prepare for user creation.
        function addUser() {
            
            $scope.editID = null;
            $scope.username = '';
            $scope.lastname = '';
            $scope.firstname = '';
            $scope.email = '';
            setViewState('add');

        }   

        // cancels the add/edit action and returns the view to the list state.
        function cancelAction() {

            $scope.editID = null;
            setViewState('list');

        }  

        // deletes the user with the id specified.
        function deleteUser(id) {

            UsersService.deleteUser($scope.users[id]._id)
                .success(function(result) {
                    console.log('User deleted successfully.')
                })
                .error(function(result, status) {
                    handleError(result, status);
                });
            setViewState('delete');

        }

        // modify the view state to prepare for user editing.
        function editUser(id) {
            
            $scope.editID = id;
            UsersService.editUser($scope.users[id]._id, {
                username: $scope.username,
                name: {
                    last: $scope.lastname;
                    first: $scope.firstname
                },
                email: $scope.email
            })
                .success(function(result) {

                })
                .error(function(result, status) {
                    handleError(result, status);
                })
            

            /*
            .success(function(result) {
                $scope.username = result.data.username;
                $scope.lastname = result.data.name.last;
                $scope.firstname = result.data.name.first;
                $scope.email = result.data.email;
            })
            .error(function(data) {
                console.log('\n\n\nApp Error:', data);
                handleError('Application failed to obtain user for edit.');
            })
*/

            setViewState('edit');

        }

        function handleError() {

        }

        function saveUser() {

        }

        // sets the active view state. depending on whether we are moving into a 'create' or 'modify' view state, the
        // view and view model will be updated to reflect that. respectively, 'add' and 'update' functions will actually
        // perform the actions.
        function setViewState(state) {

            $scope.viewState = state;
            if (state === 'create') {

            }
            if (state === 'modify') {
                
            }

        }

        // updates the user's list via a rest api call.
        function updateUsersList() {

            UsersService.getUsers()
                .success(function(result) {
                    $scope.users = result.data;
                })
                .error(function(result, status) {
                    handleError(result, status);
                });

        }

    };

    // inject controller dependencies and bind the controller to the app.
    UsersController.$inject = ['$scope', 'UsersService'];
    angular.module('userApp')
        .controller('UsersController', UsersController);

}());
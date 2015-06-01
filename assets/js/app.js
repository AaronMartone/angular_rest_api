function handleError(message){
    alert(message);
}

angular.module('resourceAPI', [])
    .controller('userController', UserController);

function UserController($scope, $http) {
    $scope.view = 'list';
    $scope.users = [];
    $scope.editID;

    $scope.addUser = function addUser() {
        setView('add');
        $scope.editID = undefined;
        $scope.username = '';
        $scope.lastname = '';
        $scope.firstname = '';
        $scope.email = '';
    }

    // cancels the add/edit action in progress.
    $scope.cancelAction = function cancelAction() {
        setView('list');
        $scope.editID = undefined;
    };

    // deletes a user from the database.
    $scope.deleteUser = function deleteUser(id) {
        setView('delete');
        $http.delete('/users/' + $scope.users[id]._id)
            .success(function(data) {
                console.log('User deleted successfully.');
                $scope.updateUserList();
                setView('list');
            })
            .error(function(data) {
                console.log('\n\n\nApp Error:', data);
                handleError('Application failed to delete user.');
                setView('list');
            });
    };

    // loads a user to be edited from the database.
    $scope.editUser = function editUser(id) {
        setView('edit');
        $scope.editID = id;
        $http.get('/users/' + $scope.users[id]._id)
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
    };

    // performs the insertion (add) or updating (edit) of a user.
    $scope.saveUser = function saveUser() {
        if ($scope.view === 'add') {
            $http.post('/users', {
                username: $scope.username,
                name: {
                    last: $scope.lastname,
                    first: $scope.firstname
                },
                email: $scope.email
            }).success(function(data) {
                console.log('User added successfully.');
                $scope.username = '';
                $scope.lastname = '';
                $scope.firstname = '';
                $scope.email = '';
                $scope.updateUserList();
            }).error(function(data) {
                console.log('Error', data);
                handleError('An error occurred while adding the user.');
            });
        }
        if ($scope.view === 'edit') {
            $http.put('/users/' + $scope.users[$scope.editID]._id, {
                username: $scope.username,
                name: {
                    last: $scope.lastname,
                    first: $scope.firstname
                },
                email: $scope.email
            }).success(function(data) {
                console.log('User edited successfully.');
                $scope.username = '';
                $scope.lastname = '';
                $scope.firstname = '';
                $scope.email = '';
                $scope.updateUserList();
            }).error(function(data) {
                console.log('Error', data);
                handleError('An error occurred while editing the user.');
            });
        }
        setView('list');
    };

    // sets the view to the specified.
    function setView(view) {
        $scope.view = view;
    }
    
    // populate the list of users on load.
    $scope.updateUserList = function updateUserList() {
        $http.get('/users')
        .success(function(result) {
            $scope.users = result.data;
        })
        .error(function(data) {
            console.log('\n\n\nApp Error:', data);
            handleError('Application failed to obtain a list of users.');
        });
    }

    $scope.updateUserList();    

}
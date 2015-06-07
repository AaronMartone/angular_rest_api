'use strict';

(function() {

    angular.module('usersApp')
        .directive('userControls', function() {
            
            return {
                restrict: 'AE',
                replace: true,
                template: '<p><button data-ng-click="editUser($index)">Edit User</button> <button data-ng-click="destroyUser($index)">Delete User</button> {{ user.username }} ({{ user.name.last }}, {{ user.name.first }} &ndash; {{ user.email }})</p>'
            };

        });

}());
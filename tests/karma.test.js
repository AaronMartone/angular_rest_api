'use strict';

// include core modules.
require('../assets/js/client');
require('angular-mocks');

describe('User controller', function() {

    var $ControllerConstructor;
    var $httpBackend;
    var $scope;

    beforeEach(angular.mock.module('userApp'));

    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        $ControllerConstructor = $controller;
    }));

    it('should create a new controller', function() {
        var userController = $ControllerConstructor('userController', { $scope: $scope });
        expect(typeof userController).toBe('object');
        expect(Array.isArray($scope.users)).toBe(true);
        expect(Array.isArray($scope.errors)).toBe(true);
        expect(typeof $scope.getAll).toBe('function');
    });

    describe('Perform REST functions', function() {
        beforeEach(angular.mock.inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            this.userController = $ControllerConstructor('userController', {$scope: $scope});
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get a list of all users', function() {
            $httpBackend.expectGET('/users').respond(200, [{
                _id: '1',
                username: 'Test User',
                name: {
                    last: 'User',
                    first: 'Test'
                },
                email: 'testuser@example.com'
            }]);
            $scope.getUsers();
            $httpBackend.flush();
            expect($scope.users[0].username).toBe('Test User');
            expect($scope.users[0].name.last).toBe('User');
            expect($scope.users[0].name.first).toBe('Test');
            expect($scope.users[0].email).toBe('testuser@example.com');
            expect($scope.users[0]._id).toBe('1');
        });

        it('should create new user', function() {
            $scope.newUser = {
                username: 'Test User',
                name: {
                    last: 'User',
                    first: 'Test'
                },
                email: 'testuser@example.com'
            };
            $httpBackend.expectPOST('/users').respond(200, {
                _id: 2,
                username: 'Test User',
                name: {
                    last: 'User',
                    first: 'Test'
                },
                email: 'testuser@example.com'
            });
            $scope.createUser();
            $httpBackend.flush();
            expect($scope.users[0].noteBody).toBe('Test User'); 
            expect($scope.users[0]._id).toBe('2');
            expect($scope.newUser).toBe(null);
        });

        it('should delete a user', function() {
            var note = {
                _id: '3', 
                username: 'Test User',
                name: {
                    last: 'User',
                    first: 'Test'
                },
                email: 'testuser@example.com'
            };
            $scope.users.push(user);
            $httpBackend.expectDELETE('/users/3').respond(200, {
                success: true,
                message: 'User successfully deleted.'
            });

            expect($scope.users.indexOf(user)).not.toBe(-1);
            $scope.deleteUser(user);
            expect($scope.users.indexOf(user)).toBe(-1);
            $httpBackend.flush(); 
            expect($scope.errors.length).toBe(0); 
        });

        it('should delete user, even on errors', function() {
            var user = {
                _id: '4', 
                username: 'Test User',
                name: {
                    last: 'User',
                    first: 'Test'
                },
                email: 'testuser@example.com'
            };
            $scope.users.push(user);
            $httpBackend.expectDELETE('/users/4').respond(500, {
                success: false,
                message: 'error while deleting user'
            });

            expect($scope.users.indexOf(user)).not.toBe(-1);
            $scope.deleteUser(user);
            expect($scope.users.indexOf(user)).toBe(-1);
            $httpBackend.flush(); 
            expect($scope.users.length).toBe(1); 
            expect($scope.users[0].msg).toBe('error while deleting user')
        });

    });

});
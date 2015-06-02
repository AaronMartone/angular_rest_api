'use strict';

// initialize the server.
process.env.MONGODB_URI = 'mongodb://localhost/angular_rest_api_test';
require('../server');

// include core modules.
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

var expect = chai.expect;

// include data models.
var User = require('../models/User.model');
var app = 'http://localhost:3000';

describe('User REST API', function() {

    // after we are done with the test, close the db connection.
    after(function(done) {
        mongoose.connection.db.dropDatabase(function() {
            done();
        });
    });

    it('should be able to create a new User', function(done) {
        chai.request(app)
        .post('/users')
        .send({
            username: 'Test User',
            name: {
                last: 'Smith',
                first: 'John'
            },
            email: 'jsmith@example.com'
        })
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(typeof res.body).to.eql('object');
            expect(res.body.success).to.eql(true);
            done();
        });
    });

    it('should be able to list all Users', function(done) {
        chai.request(app)
        .get('/users')
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(typeof res.body).to.eql('object');
            expect(res.body.success).to.eql(true);
            expect(Array.isArray(res.body.data)).to.eql(true);
            done();
        });
    });

    describe('needs a User for update and delete tests', function() {

        beforeEach(function(done) {
            var testUser = new User({
                username: 'Test User',
                name: {
                    last: 'User',
                    first: 'Test'
                },
                email: 'testUser@example.com'
            });
            testUser.save(function(err, result) {
                if (err) { throw err; }
                this.testUser = result;
                done();
            }.bind(this));
        });

        it('should have a test User generated from the \'beforeEach\' call', function(done) {
            expect(this.testUser.username).to.eql('Test User');
            expect(this.testUser).to.have.property('_id');
        });

        it('should be able to update the test User', function(done) {
            var _id = this.testUser._id;
            chai.request(app)
            .put('/users/' + _id)
            .send({
                username: 'Test User2',
                name: {
                    last: 'User2',
                    first: 'Test2'
                },
                email: 'testUser2@example.com'
            })
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.body.success).to.eql(true);
                done();
            })
        });

        it('should be able to delete the test User', function(done) {
            chai.request(app)
            .delete('/users/' + _id)
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.body.success).to.eql(true);
                done();
            });
        });

    });

});
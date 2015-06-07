// import core modules.
var path = require('path');

// import User model.
var User = require('../models/User.model');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = function(router) {

    router.route('/')
        .all(function(req, res, next) {
            res.sendFile(path.join(__dirname, '../', '/app/index.html'));
        });

    router.route('/api/users')
        // list all users.
        .get(function(req, res, next) {
            User.find({}, function(err, results) {
                if (err) { return next(err); }
                res.status(200)
                    .json({ success: true, message: 'Users list returned successfully.', data: results });
            });
        })
        // create a user.
        .post(function(req, res, next) {
            var user = new User({
                username: req.body.username,
                name: {
                    last: req.body.name.last,
                    first: req.body.name.first
                },
                email: req.body.email
            });
            user.save(function(err) {
                if (err) { return next(err); }
                res.status(200)
                    .json({ success: true, message: 'User created successfully.', data: null });
            });
        });

    router.route('/api/users/:id')
        // view a user.
        .get(function(req, res, next) {
            User.findOne({ _id: ObjectId(req.params.id) }, function(err, result) {
                if (err) { return next(err); }
                res.status(200)
                    .json({ success:true, message: 'User returned successfully.', data: result });
            });
        })
        // update a user.
        .put(function(req, res, next) {            
            User.update({ _id: ObjectId(req.params.id) }, {
                username: req.body.username,
                name: {
                    last: req.body.name.last,
                    first: req.body.name.first
                },
                email: req.body.email
            }, function(err) {
                if (err) { return next(err); }
                res.status(200)
                    .json({ success: true, message: 'User updated successfully.', data: null });
            });
        })
        // delete a user.
        .delete(function(req, res, next) {
            User.findOne({ _id: ObjectId(req.params.id) }).remove(function(err) {
                if (err) { return next(err); }
                res.status(200)
                    .json({ success: true, message: 'User deleted successfully.', data: null });
            });
        });

};
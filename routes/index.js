var express = require('express');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var config = require("../config");
var users = require("../data/users");
var friends = require("../data/friends");

var router = express.Router();

router.post('/login', (req, res, next) => {

    // req.checkBody('email', 'Email is required').notEmpty();
    // req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) return res.status(400).json(errors);

    var user = _.find(users, (user) =>
        user.email === req.body.email && user.password === req.body.password);

    if (!user) return res.status(404).json({message: "Entered login or password is incorrect"});

    var token = jwt.sign({id: 1}, config.secretKey, {expiresIn: 7200000});

    res.json({token: token})
});

router.get('/friends', (req, res, next) => {
    // req.checkBody('email', 'Email is required').notEmpty();
    // req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) return res.status(400).json(errors);

    var friends = _.find(friends, (friends) =>
    user.email === "user@gmail.com" && user.password === "password");

    if (!user) return res.status(404).json({message: "Entered login or password is incorrect"});

    var token = jwt.sign({id: 1}, config.secretKey, {expiresIn: 7200000});

    res.json({token: token})
});

module.exports = router;

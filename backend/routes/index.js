var express = require('express');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var config = require("../config");
var users = require("../data/users");
var friends = require("../data/friends");

var router = express.Router();

router.post('/login', (req, res, next) => {

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) return res.status(400).json(errors);

    var user = _.find(users, (user) =>
        user.email === req.body.email && user.password === req.body.password);

    if (!user) return res.status(404).json({message: "Entered login or password is incorrect"});

    var token = jwt.sign({id: 1}, config.secretKey, {expiresIn: 7200000});

    res.json({token: token})
});

router.use('/*', (req, res, next) => {
    try {
        jwt.verify(req.headers.token, config.secretKey);
        req.user = jwt.decode(req.headers.token);
        next();
    }
    catch (e) {
        res.status(401).json({message: "You are not permitted to do it"});
    }
});

module.exports = router;

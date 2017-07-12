const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const config = require("../config");
const users = require("../data/users");
const friends = require("../data/friends");

const router = express.Router();

/**
 * Login
 */
router.post('/login', (req, res, next) => {

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) return res.status(400).json(errors);

    var user = _.find(users, (user) =>
        user.email === req.body.email && user.password === req.body.password);

    if (!user) return res.status(404).json({message: "Entered login or password is incorrect"});

    var my = _.find(users, (user) => user.email === req.body.email);
    var token = jwt.sign({id: my.id}, config.secretKey, {expiresIn: 7200000});

    res.json({token: token})
});

/**
 * Verifying auth
 */
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

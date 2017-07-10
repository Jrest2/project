var express = require('express');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var config = require("../config");
var users = require("../data/users");
var friends = require("../data/friends");

var router = express.Router();


router.get('/', (req, res, next) => {

});

module.exports = router;

var express = require('express');
var _ = require('lodash');

var config = require("../config");
var users = require("../data/users");
var friends = require("../data/friends");

var router = express.Router();

router.get('', (req, res, next) => {


    var foundFriends = _.filter(friends, (friend) =>
        friend.user_1 !== req.user.id && friend.user_2 !== req.user.id);

    foundFriends = _.map(foundFriends, (friend) => {
        var user = _.find(users, (user) => user.id === friend.user_1 || user.id === friend.user_2);
        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            age: user.age,
            gender: user.gender
        }
    });

    foundFriends = _.filter(foundFriends, (friend) => {
        if (req.query.name && friend.name === req.query.name) return false;
        return true;
    })

    // if (!user) return res.status(404).json({message: "Entered login or password is incorrect"});

    res.json({friends: foundFriends})
});

module.exports = router;

var express = require('express');
var _ = require('lodash');

var config = require("../config");
var users = require("../data/users");
var friends = require("../data/friends");

var router = express.Router();

router.get('', (req, res, next) => {
    var foundFriends = _.filter(friends, (friend) =>{
        if(friend.user_1 === req.user.id || friend.user_2 === req.user.id) {
            return true;
        }
    });

    foundFriends = _.map(foundFriends, (friend) => {
        var friendId = friend.user_1 === req.user.id ? friend.user_2 : friend.user_1;
        var user = _.find(users, (user) => user.id === friendId);
        if(user) {
            return {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                age: user.age,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth
            }
        }
    });

    foundFriends = _.filter(foundFriends, (friend) => {
        if (req.query.name && friend.name !== req.query.name) return false;
        return true;
    });

    res.json({friends: foundFriends})
});

module.exports = router;

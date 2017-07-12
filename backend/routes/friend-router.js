const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const config = require("../config");
const users = require("../data/users");
const friends = require("../data/friends");


const router = express.Router();

/**
 * Get friends list
 */
router.get('', (req, res) => {
    var foundFriends = _.filter(friends, (friend) =>{
        if(friend.firstUser === req.user.id || friend.secondUser === req.user.id) {
            return true;
        }
    });

    foundFriends = _.map(foundFriends, (friend) => {
        var friendId = friend.firstUser === req.user.id ? friend.secondUser : friend.firstUser;
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
        return req.query.name && friend.name !== req.query.name ? false : true;
    });

    res.json({friends: foundFriends})
});

module.exports = router;

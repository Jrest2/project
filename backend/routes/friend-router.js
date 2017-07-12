const express = require('express');

const config = require("../config");
const users = require("../data/users");
const friends = require("../data/friends");


const router = express.Router();

/**
 * Get friends list
 */
router.get('', (req, res) => {
    let foundFriends = friends.filter(friend => {
        if(friend.firstUser === req.user.id || friend.secondUser === req.user.id) {
            return true;
        }
    });

    foundFriends = foundFriends.map(friend => {
        let friendId = friend.firstUser === req.user.id ? friend.secondUser : friend.firstUser;
        let user = users.find(user => user.id === friendId);

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

    foundFriends = foundFriends.filter(friend => {
        return req.query.name && friend.name !== req.query.name ? false : true;
    });


    res.json({friends: foundFriends})
});

module.exports = router;

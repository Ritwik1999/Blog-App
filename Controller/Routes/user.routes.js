const Router = require('express').Router();
const User = require('../../Model/user.model');

Router.post('/follower/new', (req, res) => {
    if (req.session.user || req.user) {
        let user = req.session.user || req.user;

        User.findOne({ username: user.username })
            .then(usr => {
                usr.people_you_are_following.push(req.body.username);
                usr.save();
                res.redirect('/');
            })
            // .then(() => {
            //     User.findOne({ username: req.body.username })
            //         .then(usr => {
            //             usr.followers.push(user.username);
            //             usr.save();
            //         })
            // })
            .catch(err => {
                console.log(err);
                res.redirect('/');
            });
    } else {
        res.redirect('/');
    }
});

module.exports = Router;
// localhost:3000/user/<Route>
const Router = require('express').Router();
const User = require('../../Model/user.model');

Router.post('/follower/add', (req, res) => {
    if (req.session.user || req.user) {
        let user = req.session.user || req.user;

        // TODO: Reconfigure the route so that either both the actions are completed or neither
        User.findOne({ username: user.username })
            .then(usr => {
                if (!usr.people_you_are_following.includes(req.body.username)) {
                    usr.people_you_are_following.push(req.body.username);
                    usr.save();
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            });

        User.findOne({ username: req.body.username })
            .then(usr => {
                if (!usr.followers.includes(user.username)) {
                    usr.followers.push(user.username);
                    usr.save();
                    res.status(200).send('Success');
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            });
    }
});

Router.post('/follower/remove', (req, res) => {
    console.log("HERE: ");
    if (req.session.user || req.user) {
        let user = req.session.user || req.user;

        // TODO: Reconfigure the route so that either both the actions are completed or neither
        User.findOne({ username: user.username })
            .then(usr => {
                let index = usr.people_you_are_following.indexOf(req.body.username)
                if (index != -1) {
                    usr.people_you_are_following.splice(index, 1);
                    usr.save();
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            });

        User.findOne({ username: req.body.username })
            .then(usr => {
                let index = usr.followers.indexOf(user.username);
                if (index != -1) {
                    usr.followers.splice(index, 1);
                    usr.save();
                    res.status(200).send('Success');
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            });
    }
});

module.exports = Router;
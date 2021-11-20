// localhost:3000/auth/local/<Route>
const bcrypt = require('bcryptjs');
const Router = require('express').Router();
const User = require('../../Model/user.model');
const salt = bcrypt.genSaltSync(10);

Router.post('/signup', (req, res) => {
    let errors = [];
    let passwordIsGood = req.body.password.length >= 8;

    if (!passwordIsGood) errors.push('Password must be greater than 7 characters');

    User.findOne({ username: req.body.username }).then(user => {
        if (user)
            errors.push(`The username ${req.body.username} is already in use`);
    }).then(() => {
        if (errors.length > 0) {
            res.render('signup', { errors });
        } else {
            let newuser = new User;
            newuser.username = req.body.username;
            newuser.email = req.body.email;
            newuser.password = bcrypt.hashSync(req.body.password, salt);
            newuser.profile_pic = req.body.profile_pic;
            newuser.followers.push(req.body.username);
            newuser.people_you_are_following.push(req.body.username);

            newuser.save(user => {
                req.session.user = user;
                res.redirect('/dashboard');
            });
        }
    });
});

Router.post('/login', (req, res) => {
    let errors = [];
    User.findOne({ username: req.body.username }).then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password) === true) {
            req.session.user = user;
            res.redirect('/dashboard');
        } else {
            errors.push('Could not log in!');
            res.render('login', { errors });
        }
    }).catch(err => {
        errors.push('User does not exist');
        res.render('login', {errors: []});
    });
});

module.exports = Router;
const Router = require('express').Router();
const passport = require('passport');

require('../Auth/fb.passport');

Router.get('/', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

Router.get('/redirect', passport.authenticate('facebook') ,(req, res) => {
    res.redirect('/dashboard');
});

module.exports = Router;
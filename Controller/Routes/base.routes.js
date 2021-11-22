// localhost:3000/<Route>
const Router = require('express').Router();
const Article = require('../../Model/article.model');
const User = require('../../Model/user.model');

Router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/signup');
    }
});

Router.get('/signup', (req, res) => {
    res.render('signup', { errors: [] });
});

Router.get('/login', (req, res) => {
    res.render('login', { errors: [] });
});

Router.get('/new_article', (req, res) => {
    res.render('new_article');
});

Router.get('/search/:tag', (req, res) => {
    Article.find({ tags: req.params.tag })
        .populate('author', 'username')
        .then(articles => {
            res.render('search', { articles, });
        });
});

Router.get('/search', (req, res) => {
    res.render('search', { articles: [] });
});

Router.get('/dashboard', (req, res) => {
    if (req.session.user || req.user) {
        let user = req.session.user || req.user;
        let usr_ids = [];
        User.find({ username: { $in: user.people_you_are_following } })
            .then(usrs => {
                usrs.forEach(usr => usr_ids.push(usr._id));
            })
            .then(() => {
                Article.find({ author: { $in: usr_ids } })
                    .populate('author', ['username'])
                    .then(articles => {
                        res.render('dashboard', { articles, });
                    });
            })
            .catch(err => {
                res.redirect('/');
            });
    } else {
        res.redirect('/');
    }
});

module.exports = Router;
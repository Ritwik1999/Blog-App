// localhost:3000/<Route>
const Router = require('express').Router();
const Article = require('../../Model/article.model');

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
    Article.find({ tags: req.params.tag }).populate('author', 'username').then(articles => {
        res.render('search', { articles, });
    });
});

Router.get('/search', (req, res) => {
    res.render('search', { articles: [] });
});

module.exports = Router;
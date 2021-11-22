// localhost:3000/article/<Route>
const Router = require('express').Router();
const Article = require('../../Model/article.model');

Router.post('/new', (req, res) => {
    if (req.session.user || req.user) {
        let user = req.session.user || req.user;
        let newarticle = new Article;
        newarticle.title = req.body.title;
        newarticle.description = req.body.description;
        newarticle.image = req.body.image;
        newarticle.tags = req.body.tags;
        newarticle.author = user._id;

        newarticle.save((err, article) => {
            res.redirect('/dashboard');
        });
    } else {
        res.redirect('/');
    }
});

module.exports = Router;
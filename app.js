// Load the required modules
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
// const ejs = require('ejs');

// Load the required routers
const baseRoutes = require('./Controller/Routes/base.routes');
const userRoutes = require('./Controller/Routes/user.routes');
const fbRoutes = require('./Controller/Routes/fb.routes');
const localRoutes = require('./Controller/Routes/local.routes');
const articleRoutes = require('./Controller/Routes/articles.routes');

// Initialise and configure the app
const app = express();
const key = require('./key');
const db = key.db.remote || 'mongodb://localhost/' + key.db.local;
const port = process.env.PORT || 3000;

// Connect to the database
mongoose.connect(db);

// Setup the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: key.session.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Setup the routes
app.use('/', baseRoutes);
app.use('/auth/local', localRoutes);
app.use('/auth/facebook', fbRoutes);
app.use('/post', articleRoutes);
app.use('/user', userRoutes);

// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log('Listening on port: ', port);
    } else {
        console.log('some error occured: ', error);
    }
});
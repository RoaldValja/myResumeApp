require('dotenv').config();
const express = require('express');
const mainRouter = require('./routes/mainRoute');
const errorRouter = require('./routes/errorRoute');
const session = require('express-session');
const passport = require('passport');

require('./models/db');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(mainRouter);
app.use(errorRouter);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const express = require('express');
const session = require('express-session');

const passport = require('passport');

const app = express();
app.use(session({secret: "mysecret"}));
app.use(passport.initialize());
app.use(passport.session());

const moment = require('moment');
const path = require('path');


app.use(bodyParse.json()); // this is important for js fetch request body params to go through

//////////////////LOGIN///////////////////

const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
        clientID: "*****o.apps.googleusercontent.com",
        clientSecret: "*****",
        callbackURL: 'https://swwao.courses.orbit.au.dk/grp-4/google/callback',
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        // User.findOrCreate({googleId: profile.id}, function(err, user){
            return done(null, profile);//user);
        // });
    }
));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

///////////////////////////

// Live Reload configuration
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// Fontend route
const FrontRouter = require('./routes/front');

// Set ejs template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(connectLiveReload());

app.use(bodyParse.urlencoded({ extended: false }));
app.locals.moment = moment;

// Database connection
const db = require('./config/keys').mongoProdURI;
console.log(db);
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log(`Mongodb Connected`))
    .catch(error => console.log(error));


app.use(FrontRouter);

//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
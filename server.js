const express= require('express')
const bodyParser= require('body-parser')
const massive= require('massive');
const cors= require('cors')
const session= require('express-session')
const Auth0Strategy = require('passport-auth0')
const passport= require('passport')
const isAuthenticated= require('./middlewares/isAuthenticated')
// const aws = require('aws-sdk')

const auctionController = require('./controllers/Auctions_Controller')
const bidsController = require('./controllers/Bids_Controller')
const dashController = require('./controllers/Dashboard_controller')

require('dotenv').config();

const port = 5050
const app = express();

app.use(bodyParser.json());
app.use( cors());

// SESSION & PASSPORT SETUP

app.use( session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave:false 

}))

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db=> {
    app.set('db', db)
}).catch(err => {
    console.error(err);
})

passport.use(
    new Auth0Strategy(
    {
        domain: process.env.AUTH_DOMAIN,
        clientID: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_CLIENT_SECRET,
        callbackURL: process.env.AUTH_CALLBACK,
        scope:  'openid profile email'
        

    },
    function(accessToken, refreshToken, extraParams, profile, done){
        const db= app.get('db');
        db.get_user_by_fb_id({ fb_id: profile.id }).then(results => {
            let user = results[0];
    
            if (user) {
              return done(null, user);
            } else {
              let userObj = {
                display_name: profile.displayName,
                fb_id: profile.id,
                img_url: profile.picture,
                email: profile.emails[0].value
              }

    
              db.create_user(userObj).then(results => {
                let user = results[0];
                return done(null, user);
            }).catch(error => console.log("error",error)); 
        }
    })}
));

passport.serializeUser((user, done) => {
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    return done(null, user)
  });


  app.get("/auth", passport.authenticate("auth0"));
  app.get(
    "/auth/callback",
    passport.authenticate("auth0", {
      successRedirect: "http://localhost:3000",
      failureRedirect: "http://localhost:5050/auth"
    })
  );

  app.get("/auth/me", (req, res) => {
    if (req.isAuthenticated()) {
      return res.send(req.user);
    } else {
      return res.status(404).send("Please Sign In!");
    }
  });

// AWS SETUP
// aws.config.update({
//   accessKeyId: AWS_ACCESS_KEY,
//   secretAccessKey: AWS_SECRET_KEY
// });


// var aws = require('aws-sdk');

// aws.config.update({
//     accessKeyId: AWS_ACCESS_KEY,
//     secretAccessKey: AWS_SECRET_KEY
// });

// exports = module.exports = {
//     sign: function(filename, filetype) {
//         var s3 = new aws.S3();

//         var params = {
//             Bucket: SOME_BUCKET,
//             Key: filename,
//             Expires: 60,
//             ContentType: filetype
//         };

//         s3.getSignedUrl(‘putObject’, params, function(err, data) {
//             if (err) {
//                 console.log(err);
//                 return err;
//             } else {
//                 return data;
//             }
//         });
//     }
// };


// DASHBOARD ENDPOINTS
app.get('/api/my_auctions', isAuthenticated, dashController.getAuctionsByUserId)
app.get('/api/auctions/watchlist', isAuthenticated, dashController.getUserWatchlist )
app.delete('/api/auctions/watchlist/:id', isAuthenticated, dashController.deleteFromWatchlist)

// AUCTION ENDPOINTS
app.get('/api/auctions', isAuthenticated, auctionController.getAllAuctions)
app.post('/api/auctions',isAuthenticated, auctionController.createAuction )
app.post('/api/auctions/watchlist', isAuthenticated, auctionController.addToWatchlist)

// BID ENDPOINTS
app.post('/api/bid', isAuthenticated, bidsController.createBid)
app.post('/api/auctions/bid', isAuthenticated, bidsController.updateCurrentBid)



app.listen( port, () => console.log('listening on port', port))
const express= require('express')
const bodyParser= require('body-parser')
const massive= require('massive');
const cors= require('cors')
const session= require('express-session')
const Auth0Strategy = require('passport-auth0')
const passport= require('passport')
const isAuthenticated= require('./middlewares/isAuthenticated')
const AWS = require('./controllers/AWSController')
const socket = require('socket.io')
const moment = require('moment')
moment().format();
const fs = require('fs')

const cron = require('node-cron')
const path = require('path')




const auctionController = require('./controllers/Auctions_Controller')
const bidsController = require('./controllers/Bids_Controller')
const dashController = require('./controllers/Dashboard_controller')

require('dotenv').config();

const port = 5050
const app = express();



app.use(bodyParser.json());
app.use( cors());

// CRON SETUP

cron.schedule('* * * * *', function(){
  var currentTime = moment().subtract(6, 'hours')
  var streamWrite = 'Cron success ending auctions!' + currentTime + ', ';
  var stream = fs.createWriteStream('./serverLogs.txt', {flags:'a'}); 
  stream.write(streamWrite);
  stream.end()
     
  auctionController.cronCheckAuctionEnd(app, stream);
});

cron.schedule('* * */24 * *', function(){
  fs.unlink('./serverLogs.txt', function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });
});

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

  // AUTH ENDPOINTS
  app.get("/auth", passport.authenticate("auth0"));
  app.get(
    "/auth/callback",
    passport.authenticate("auth0", {
      successRedirect: "/MyDash",
      failureRedirect: "/"
    })
  );

  app.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get("/auth/me", (req, res) => {
    if (req.isAuthenticated()) {
      return res.send(req.user);
    } else {
       return res.send(false);
    }
  });

  app.use( express.static( `${__dirname}/client/build` ) );
 

// DASHBOARD ENDPOINTS
app.get('/api/my_auctions', isAuthenticated, dashController.getAuctionsByUserId)
app.get('/api/auctions/watchlist', isAuthenticated, dashController.getUserWatchlist )
app.delete('/api/auctions/watchlist/:id', isAuthenticated, dashController.deleteFromWatchlist)

// AUCTION ENDPOINTS
app.get('/api/auctions', isAuthenticated, auctionController.getAllAuctions)
app.post('/api/auctions',isAuthenticated, auctionController.createAuction )
app.put('/api/auctions', isAuthenticated, auctionController.endAuction)
app.post('/api/auctions/watchlist', isAuthenticated, auctionController.addToWatchlist)
app.get('/api/auctions/endAuction/:auctionId', auctionController.getAuctionWinner)


// BID ENDPOINTS
app.post('/api/bid', isAuthenticated, bidsController.createBid)
app.post('/api/auctions/bid', isAuthenticated, bidsController.updateCurrentBid)

// AWS ENDPOINT
app.post('/api/aws', isAuthenticated, AWS.sign)

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


 const server = app.listen( port, () => console.log('listening on port', port))

//  SOCKET SETUP

io = socket(server)

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_BID', function(data){
    io.emit('RECEIVE_BID', data);
})


});
require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authRoute = require("./src/routes/auth")
const passportSetup= require('./config/passport');


const PORT = 8080;
const mongoose = require('mongoose');
const User = require('./src/models/user');
const cors = require('cors');
const { status } = require('http-status');
const MongoStore =require('connect-mongo');

main()
  .then(() => { console.log('connection successful'); })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/videocall');
}

app.use(express.json()); // ✅ Parses JSON data
app.use(express.urlencoded({ extended: true })); // ✅ Parses form data

const sessionOptions = ({
  secret: 'videoCall',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/videocall',
    collectionName: 'sessions'
  }),
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
})

// Authntication for google {
// passport.use(new GoogleStrategy({
//   clientID: process.env['GOOGLE_CLIENT_ID'],
//   clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
//   // callbackURL: '/oauth2/redirect/google',
//   callbackURL: 'http://localhost:8080/oauth2/redirect/google',
//   scope: ['profile']
// }, function verify(issuer, profile, cb) {
//   db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
//     issuer,
//     profile.id
//   ], function (err, row) {
//     if (err) { return cb(err); }
//     if (!row) {
//       db.run('INSERT INTO users (name) VALUES (?)', [
//         profile.displayName
//       ], function (err) {
//         if (err) { return cb(err); }

//         var id = this.lastID;
//         db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
//           id,
//           issuer,
//           profile.id
//         ], function (err) {
//           if (err) { return cb(err); }
//           var user = {
//             id: id,
//             name: profile.displayName
//           };
//           return cb(null, user);
//         });
//       });
//     } else {
//       db.get('SELECT * FROM users WHERE id = ?', [row.user_id], function (err, row) {
//         if (err) { return cb(err); }
//         if (!row) { return cb(null, false); }
//         return cb(null, row);
//       });
//     }
//   });
// }));



// 2nd
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:8080/oauth2/redirect/google',
//   scope: ['profile', 'email']
// }, async (issuer, profile, done) => {
//   try {
//     console.log("Google Profile:", profile);
//     let user = await User.findOne({ googleId: profile.id });

//     if (!user) {
//       user = new User({
//         googleId: profile.id,
//         username: profile.displayName,
//         email: profile.emails[0].value,
//         profilePicture: profile.photos[0].value
//       });

//       await user.save();
//     }

//     return done(null, user);
//   } catch (error) {
//     return done(error, null);
//   }
// }));


// 3rd
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:8080/oauth2/redirect/google',
//   scope: ['profile', 'email']
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     console.log("Google Profile:", profile);

//     // ✅ Check if email exists
//     if (!profile.emails || profile.emails.length === 0) {
//       console.error("🔴 No email found in Google Profile");
//       return done(new Error("Google account does not have an email"), null);
//     }

//     const userEmail = profile.emails[0].value;

//     // ✅ Check if user already exists in MongoDB
//     let user = await User.findOne({ googleId: profile.id });

//     if (!user) {
//       // ✅ If user doesn't exist, create a new user in MongoDB
//       user = new User({
//         googleId: profile.id,
//         username: profile.displayName,
//         email: userEmail,
//         profilePicture: profile.photos?.[0]?.value || ''
//       });

//       await user.save();
//     }

//     return done(null, user);
//   } catch (error) {
//     return done(error, null);
//   }
// }));
app.use(session(sessionOptions));
app.use(flash());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
// this line is to authenticate the user
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/auth", authRoute);
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  next();
})

app.get('/home', (req, res) => {
  console.log(status.NOT_FOUND);
  res.send("you are at base route");
})

app.post('/signin', async (req, res) => {
  try {
    console.log('requested for sign in');
    console.log(req.body);
    let { username, password } = req.body;
    let newUser = new User({ username });
    let result = await User.register(newUser, password);
    console.log(result);
    res.status(status.OK).json({ message: "Registered Successfully" })
  }
  catch (e) {
    res.status(status.FORBIDDEN).json({ message: e.message });
  }
})

app.listen(PORT, (req, res) => {
  console.log(`Listening to the port ${PORT}`);
})
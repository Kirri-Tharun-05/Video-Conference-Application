require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authRoute = require("./src/routes/auth")
const passportSetup = require('./config/passport');


const PORT = 8080;
const mongoose = require('mongoose');
const User = require('./src/models/user');
const cors = require('cors');
const { status } = require('http-status');
const MongoStore = require('connect-mongo');

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

app.use(session(sessionOptions));
app.use(flash());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend origin
    credentials: true,
  }
  ));
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
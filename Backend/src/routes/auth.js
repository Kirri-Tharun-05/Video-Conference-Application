const router = require("express").Router();
const passport = require("passport");
const CLIENT_URL = "https://nex-call-luk0.onrender.com/home";
const User = require('../models/user');

router.get('/user', (req, res) => {
  if(req.user){
  // if (req.isAuthenticated()) {
    console.log('inside auth.js')
    console.log(req.user);
    res.status(200).json(req.user);
  }
  else {
    res.status(401).json({ message: 'not authenticated' });
  }
})
router.get("/login/success", (req, res) => {
  if (req.user) {
  // if (req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Login failed",
  });
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => { // ✅ Pass a callback function
    if (err) {
      console.error('Logout error:', err);
      return next(err);
    }
    req.session.destroy(() => {  // ✅ Destroy session
      // res.clearCookie("connect.sid"); // ✅ Clear session cookie
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Make sure the cookie is cleared properly
        sameSite: "none",
      }); 
      console.log("✅ User logged out successfully");
      res.status(200).json({ message: "Logged out successfully" }); // ✅ Redirect to home page
    });
  });
});

router.get("/google",
  passport.authenticate("google",
    {
      scope: ["profile", 'email'],
      prompt: 'select_account' // ✅ Forces Google to show the account selection screen 
    }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
router.get('/check-session', (req, res) => {
  if (req.isAuthenticated()) {
      res.json({ authenticated: true, user: req.user });
  } else {
      res.json({ authenticated: false });
  }
});
module.exports = router;
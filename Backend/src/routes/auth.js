const router = require("express").Router();
const passport = require("passport");
const CLIENT_URL = "http://localhost:5173/home";

router.get("/login/success", (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //cookies: req.cookies
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
    message: "failure",
  });
});
router.get("/logout", (req, res) => {
  req.logout((err) => { // ✅ Pass a callback function
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {  // ✅ Destroy session
      res.clearCookie("connect.sid"); // ✅ Clear session cookie
      res.redirect(CLIENT_URL); // ✅ Redirect to home page
    });
  });

  res.redirect(CLIENT_URL);
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
module.exports = router
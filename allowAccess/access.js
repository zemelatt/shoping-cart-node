let auth = (req, res, next) => {
  console.log(req);
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("error", "log in first");
    res.render("back", {
      title: "Log in",
      error: req.flash("error"),
      user: req.user,
    });
  }
};
module.exports = { auth: auth };

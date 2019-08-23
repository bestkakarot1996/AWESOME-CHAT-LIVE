let getHomeController = (req, res) => {
  return res.render("main/home/home", {
    errors: req.flash("errors"),
    success: req.flash("success"),
    user: req.user
  });
};


module.exports = {
  getHomeController: getHomeController
};
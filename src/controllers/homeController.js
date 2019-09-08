import { notificationsService } from "./../services/indexServices";

let getHomeController = async (req, res) => {
  let notifications = await notificationsService.getNotifications(req.user._id);
  console.log(notifications);
  
  return res.render("main/home/home", {
    errors: req.flash("errors"),
    success: req.flash("success"),
    user: req.user,
    notifications: notifications
  });
};


module.exports = {
  getHomeController: getHomeController
};
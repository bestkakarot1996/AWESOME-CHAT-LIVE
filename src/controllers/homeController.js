import { notificationsService } from "./../services/indexServices";

let getHomeController = async (req, res) => {
  // only 10 item notification
  let notifications = await notificationsService.getNotifications(req.user._id);
  // lấy tổng số notification chưa đọc
  let countNotifiUnread = await notificationsService.countNotifiUnread(req.user._id);
  
  return res.render("main/home/home", {
    errors: req.flash("errors"),
    success: req.flash("success"),
    user: req.user,
    notifications: notifications,
    countNotifiUnread: countNotifiUnread
  });
};


module.exports = {
  getHomeController: getHomeController
};
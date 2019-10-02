import { notification, contact } from "./../services/indexServices";

let getHomeController = async (req, res) => {
  /**get only 10 item notification */
  let notifications = await notification.getNotifications(req.user._id);
  // get notification mark as read
  let countNotifiUnread = await notification.countNotifiUnread(req.user._id);


  /**get contact 10 item one time */
  let contactBook = await contact.getContactsBook(req.user._id);
  // count contacts
  let contactSent = await contact.getContactSent(req.user._id);
  // lấy tổng số notification chưa đọc
  let contactReceived = await contact.getContactReceived(req.user._id);


  /**get contact 10 item one time */
  let countAllContactBook = await contact.countAllContactBook(req.user._id);
  let countAllContactSent = await contact.countAllContactSent(req.user._id);
  let countAllContactReceived = await contact.countAllContactReceived(req.user._id);

  return res.render("main/home/home", {
    errors: req.flash("errors"),
    success: req.flash("success"),
    user: req.user,
    notifications: notifications,
    countNotifiUnread: countNotifiUnread,
    contactBook: contactBook,
    contactSent: contactSent,
    contactReceived: contactReceived,
    countAllContactBook: countAllContactBook,
    countAllContactSent: countAllContactSent,
    countAllContactReceived: countAllContactReceived
  });
};




module.exports = {
  getHomeController: getHomeController
};
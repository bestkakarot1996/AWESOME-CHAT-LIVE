import NotificationModel from "./../model/notificationModel";
import UserModel from "./../model/userModel";

const LIMIT_NUMBER_TAKEN = 10;
/**
 * 
 * @param {String} currentUserId 
 * @param {Number} limit
 * Láy dữ liệu đổ về view 
 */
let getNotifications = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId, LIMIT_NUMBER_TAKEN);

      // sử dụng map để lấy được tất cả các thông báo trong bảng ghi 
      let getNotifiContents = notifications.map(async (notification) => {
        // query vào dữ liệu và lấy senderId ra
        let sender = await UserModel.getNormalFindUserDataById(notification.senderId);
        return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id ,sender.username, sender.avatar);
      });
      resolve(await Promise.all(getNotifiContents));
    } catch (error) {
      reject(error);
    }
  });
};

let readMore = (currentUserId, skipNumberNotification) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newNotifications = await NotificationModel.model.getReadMore(currentUserId, skipNumberNotification, LIMIT_NUMBER_TAKEN);


      // sử dụng map để lấy được tất cả các thông báo trong bảng ghi 
      let getNotifiContents = newNotifications.map(async (notification) => {
        // query vào dữ liệu và lấy senderId ra
        let sender = await UserModel.getNormalFindUserDataById(notification.senderId);

        return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);
      });
      // console.log(await Promise.all(getNotifiContent));
      resolve(await Promise.all(getNotifiContents))
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Mark all as read
 * @param {string} currentUserId 
 * @param {array} targetUsers 
 */
let markAllAsRead = (currentUserId, targetUsers) => {
  return new Promise(async (resolve, reject) => {
    try {
      await NotificationModel.model.markAllAsRead(currentUserId, targetUsers);
      resolve(true);
    } catch (error) {
      console.log(`Error when mark notification as read: ${error}`);
      reject(false);
    }
  });
};


let countNotifiUnread = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let notificationsUnread = await NotificationModel.model.countNotifiUnread(currentUserId);
      resolve(notificationsUnread);

    }
    catch (error) {
      reject(error);
    }
  });
};

/**
 * 
 * @param {string} currentUserId // 10 item
 * @param {number} skipNumberNotification 
 */


module.exports = {
  getNotifications: getNotifications,
  countNotifiUnread: countNotifiUnread,
  readMore: readMore,
  markAllAsRead: markAllAsRead
};
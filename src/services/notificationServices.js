import NotificationModel from "./../model/notificationModel";
import UserModel from "./../model/userModel";
/**
 * 
 * @param {String} currentUserId 
 * @param {Number} limit
 * Láy dữ liệu đổ về view 
 */
let getNotifications = (currentUserId, limit = 10) => {
  return new Promise(async (resolve, reject) => {
    try {
      let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId, limit);
      // sử dụng map để lấy được tất cả các thông báo trong bảng ghi 
      let getNotifiContent = notifications.map(async(notification) => {
        // query vào dữ liệu và lấy senderId ra
        let sender = await UserModel.findUserById(notification.senderId);

        return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar );
      });
      // console.log(await Promise.all(getNotifiContent));
      resolve(await Promise.all(getNotifiContent))
        
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getNotifications: getNotifications
};
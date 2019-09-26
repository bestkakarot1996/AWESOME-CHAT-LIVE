import mongoose from "mongoose";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
  // _id : tự tạo ra
  senderId: String,
  receiverId: String, // người nhận
  type: String,
  content: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
});

NotificationSchema.statics = {
  createNew(item) {
    return this.create(item); // Tạo 1 bản ghi từ let ContactSchema = new Schema và this.create = ContactSchema = new Schema là một thuộc tính trong mongoose
  },
  removeRequestContactNotification(senderId, receiverId, type) {
    return this.remove({
      $and: [
        { "senderId": senderId },
        { "receiverId": receiverId },
        { "type": type }
      ]
    }).exec();
  },
  /** 
   * 
   * @param {String} userId 
   * @param {Number} Limit 
   * giới hạn thông báo đổ về view
   */
  getByUserIdAndLimit(userId, limit) {
    return this.find({
      "receiverId": userId
    }).sort({ "createdAt": -1 }).limit(limit).exec();
    // sort sắp xếp chiều thông báo 
  },
  /**
   * 
   * @param {string} userId 
   * @param {number} skip 
   * @param {number} limit 
   */
  getReadMore(userId, skip, limit) {
    return this.find({
      "receiverId": userId
    }).sort({ "createdAt": -1 }).skip(skip).limit(limit).exec();
    // sort sắp xếp chiều thông báo 
  },
  /**
   * 
   * @param {*} userId 
   * đếm số thông báo chưa đọc
   */
  countNotifiUnread(userId) {
    return this.count({
      $and: [
        { "receiverId": userId },
        { "isRead": false }
      ]
    }).exec();
  },
  

};

const NOTIFICATION_TYPES = {
  ADD_CONTACT: "add_contact"
};

const NOTIFICATION_CONTENT = {
  getContent: (notificationType, isRead, userId, username, userAvatar) => {
    if (notificationType === NOTIFICATION_TYPES.ADD_CONTACT) {
      if (!isRead) {
        return `
        <div class="noti-readed-false" data-uid="${userId}">
        <img class="avatar-small" src="./images/users/${userAvatar}" alt=""> 
        <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn!
      </div>
      `;
      }

      return `
        <div data-uid="${userId}">
        <img class="avatar-small" src="./images/users/${userAvatar}" alt=""> 
        <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn!
      </div>
      `;
    }
    return "No watching type notification"
  }
};

module.exports = {
  model: mongoose.model("notification", NotificationSchema),
  types: NOTIFICATION_TYPES,
  contents: NOTIFICATION_CONTENT
};
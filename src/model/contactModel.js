// require mongose
import mongoose from "mongoose";
// import Schema
let Schema = mongoose.Schema;
// Tạo Schema
let ContactSchema = new Schema({
  // _id : tự tạo ra
  userId: String,
  contactId: String,
  status: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});

// creact table database contact
ContactSchema.statics = {
  createNew(item) {
    return this.create(item); // Tạo 1 bản ghi từ let ContactSchema = new Schema và this.create = ContactSchema = new Schema là một thuộc tính trong mongoose
  },
  /**
   * @param {string} userID tìm tất cả các userID có trong bản ghi
   */
  findAllByUser(userID) {
    return this.find({
      $or: [
        { "userId": userID },
        { "contactId": userID }
      ]
    }).exec();
  },
  /**
   * Kiểm tra tồn tại sủa 2 ID
   * @param {string} userId 
   * @param {string} contactId 
   */
  checkExists(userId, contactId) {
    return this.findOne({
      // Kiểm tra chéo: Ví dụ userId là A và A gửi cho B (chính là contactId) thì sẽ rơi vào trường hợp 1 
      // TH2 : tránh trường hợp A đã gửi kết bạn cho B nhưng B vẫn gửi lời mời kết bạn cho A được (TH này vô lý)
      // TH2 đúng  thì A kp B thì B sẽ nhận được lời mời kết bạn là accept 
      $or: [
        {
          $and: [
            { "userId": userId },
            { "contactId": contactId }
          ]
        },
        {
          $and: [
            { "userId": contactId },
            { "contactId": userId }
          ]
        }
      ]
    }).exec();
  },
  /**
   * Remove request
   * @param {string} userId 
   * @param {string} contactId 
   */
  removeContact(userId, contactId) {
    return this.remove({
      $and: [
        { "userId": userId },
        { "contactId": contactId }
      ]
    }).exec();
  }
};

//export + tạo model
module.exports = mongoose.model("contact", ContactSchema);


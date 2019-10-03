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
  },
  /**
   * 
   * @param {string} contactId 
   *  @param {number} limit 
   */
  getContactBook(userId, limit) {
    return this.find({
      $and: [
        {
          $or: [
            { "userId": userId },
            { "contactId": userId },
            { "status": true }
          ]
        },
      ]
    }).sort({ "createdAt": -1 }).limit(limit).exec();
  },
  /**
   * 
   * @param {string} contactId 
   *  @param {number} limit 
   */
  getContactSent(userId, limit) {
    return this.find({
      $and: [
        { "userId": userId },
        { "status": false }
      ]
    }).sort({ "createdAt": -1 }).limit(limit).exec();
  },
  /**
   * 
   * @param {string} contactId 
   *  @param {number} limit 
   */
  contactReceived(userId, limit) {
    return this.find({
      $and: [
        { "contactId": userId }, // người khác gửi kết bạn cho mình 
        { "status": false }
      ]
    }).sort({ "createdAt": -1 }).limit(limit).exec();
  },

  /**
   * 
   * @param {string} contactId 
   */
  countAllContactBook(userId) {
    return this.count({
      $and: [
        {
          $or: [
            { "userId": userId },
            { "contactId": userId },
            { "status": true }
          ]
        },
      ]
    }).exec();
  },
  /**
   * 
   * @param {string} contactId 
   */
  countAllContactSent(userId) {
    return this.count({
      $and: [
        { "userId": userId },
        { "status": false }
      ]
    }).exec();
  },
  /**
   * 
   * @param {string} contactId 
   */
  countAllContactReceived(userId) {
    return this.count({
      $and: [
        { "contactId": userId }, // người khác gửi kết bạn cho mình 
        { "status": false }
      ]
    }).exec();
  },
  /**
   * 
   * @param {*} userId 
   * @param {*} skip 
   * @param {*} limit 
   */
  getReadMoreContactBook(userId, skip, limit) {
    return this.find({
      $and: [
        {
          $or: [
            { "userId": userId },
            { "contactId": userId },
            { "status": true }
          ]
        },
      ]
    }).sort({ "createdAt": -1 }).skip(skip).limit(limit).exec();
  },

  getReadMoreContactSent(userId, skip, limit) {
    return this.find({
      $and: [
        { "userId": userId },
        { "status": false }
      ]
    }).sort({ "createdAt": -1 }).skip(skip).limit(limit).exec();
  },

  getReadMoreContactReceived(userId, skip, limit) {
    return this.find({
      $and: [
        { "contactId": userId }, // người khác gửi kết bạn cho mình 
        { "status": false }
      ]
    }).sort({ "createdAt": -1 }).skip(skip).limit(limit).exec();
  }



};

//export + tạo model
module.exports = mongoose.model("contact", ContactSchema);


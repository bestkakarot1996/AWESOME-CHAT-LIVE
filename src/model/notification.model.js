import mongoose from "mongoose";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
  // _id : tự tạo ra
  sender: {
    id: String,
    userName: String,
    avatar: String
  },
  receiver: {
    id: String,
    userName: String,
    avatar: String
  },
  type: String,
  content: String,
  isRead: {type: Boolean, default: false},
  createdAt: { type: Number, default: Date.now },
});
module.exports = mongoose.model("notification", NotificationSchema);
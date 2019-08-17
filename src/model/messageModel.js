import mongoose from "mongoose";

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
  // _id : tự tạo ra
  sender: {
    id: String,
    userName: String,
    avatar: String
  },
  text: String,
  file: {data: Buffer, contentType: String, fileName: String},
  status: {type: Boolean, default: false},
  createdAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});
module.exports = mongoose.model("message", MessageSchema);
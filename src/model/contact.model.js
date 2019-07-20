import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
  // _id : tự tạo ra
  userId: String,
  contactId: String ,
  status: {type: Boolean, default: false},
  createdAt: { type: Number, default: Date.now },
  updateAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});
module.exports = mongoose.model("contact", ContactSchema);
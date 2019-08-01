import mongoose from "mongoose";
import bluebird from "bluebird";
require('dotenv').config();
/** 
CONNECT TO DATABASE MONGODB
*/
let connectDB = () => {
  mongoose.Promise =  bluebird;
  // mongodb://localhost:27017/awsome_chat
  let URL = `${process.env.DB_CONNECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  // console.log(URL);
  // sử dụng thuộc tính connect trong mongo để kết nối đến database
  return mongoose.connect(URL, {useMongoClient: true})
  .then(() => console.log("connect database success"))
  .catch(err => console.log(Error, err))
}
module.exports = connectDB;

import express from "express";
import connectDB from "./connectBD";
// import ContactModel from "./model/contact.model";
import configViewEngine from "./config/viewEngine";
// import dotenv from "dotenv";
require('dotenv').config();
let app = express();

// run function connectDB MongoDB
connectDB();
// configViewEngin 
configViewEngine(app);
// test database
app.get("/", (req, res) => {
  return res.render("main/master");
});
app.get("/login-register", (req, res) => { 
  return res.render("authLogin/loginRegister")
});
app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`my name app message chat $(hostname):${process.env.APP_PORT}/`);
});

// TEST DATABASE 
// app.get("/", (req, res) => {
//   return res.render("main/master");
// });
// try {
//   let item = {
//     userId: "92398298398",
//     contactId: "76237636161"
//   };
//   // vì mặc định đã có promiseawait nên có thể dùng thẳng async await
//   // console.log(contact =  ContactModel.create(item));
//   let contact = await ContactModel.create(item); // dùng async await để nó đợi ContactModel tạo bảng ghi xong thì mới gán vào send connect
//   res.send(contact)
// } catch (error) {
//   console.log(error);
// }
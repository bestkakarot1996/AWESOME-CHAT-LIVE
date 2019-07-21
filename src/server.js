import express from "express";
import connectDB from "./connectBD";
import ContactModel from "./model/contact.model";
// import dotenv from "dotenv";
require('dotenv').config();
let app = express();

// run function connectDB MongoDB
connectDB();

app.get("/testDB", async (req, res) => {
  try {
    let item = {
      userId: "Admin",
      contactId: "admin"
    };
    // vì mặc định đã có promise nên có thể dùng thẳng async await
    // console.log(contact = await ContactModel.create(item));
    let contact = await ContactModel.create(item); // dùng async await để nó đợi ContactModel tạo bảng ghi xong thì mới gán vào send connect
    res.send(contact)
  } catch (error) {
    console.log(error);
  }
});
app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`hello app chat $(hostname):${process.env.APP_PORT}/`);
});

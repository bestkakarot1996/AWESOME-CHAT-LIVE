import express from "express";
import connectDB from "./connectBD";
// import ContactModel from "./model/contact.model";
import configViewEngine from "./config/viewEngine";
//import initRoutes 
import initRoutes from "./routes/web";
// import dotenv from "dotenv";
require('dotenv').config();
let app = express();

// run function connectDB MongoDB
connectDB();
// configViewEngin 
configViewEngine(app);
// initRoutes all router
initRoutes(app);
app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`my name app message chat $(hostname):${process.env.APP_PORT}/`);
});
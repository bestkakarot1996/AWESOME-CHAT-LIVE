import express from "express";
import connectDB from "./connectBD";
// import ContactModel from "./model/contact.model";
import configViewEngine from "./config/viewEngine";
//import initRoutes 
import initRoutes from "./routes/web";
// import bodyParser
import bodyParser from "body-parser";
// import connectFlash
import connectFlash from "connect-flash";
// import session
import configSession from "./config/session";
// import passport
import passport from "passport";
// import dotenv from "dotenv";
require('dotenv').config();
let app = express();

// run function connectDB MongoDB
connectDB();
// run configSession after run file connectDB
configSession(app);
// configViewEngin 
configViewEngine(app);
// enable bodyParser app 
app.use(bodyParser.urlencoded({extended: true}));
// enable connectFlash
app.use(connectFlash());
// config Passprort
app.use(passport.initialize());
app.use(passport.session());
// initRoutes all router
initRoutes(app);
app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`my name app message chat $(hostname):${process.env.APP_PORT}/`);
});
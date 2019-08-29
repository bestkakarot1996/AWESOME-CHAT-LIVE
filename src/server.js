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
import session from "./config/session";
// import passport
require('dotenv').config();
import passport from "passport";
// import pem from "pem";
import http from "http";
import socketio from "socket.io";
import initSockets from "./sockets/indexSocket";

import cookieParser from "cookie-parser";
import configSocketIo from "./config/socketio";

let app = express();

// init server with socket io and express app 
let server = http.createServer(app);
let io = socketio(server);

// run function connectDB MongoDB
connectDB();
// run configSession after run file connectDB
session.config(app);
// configViewEngin 
configViewEngine(app);
// enable bodyParser app 
app.use(bodyParser.urlencoded({ extended: true }));
// enable connectFlash
app.use(connectFlash());

// use app cookieParser

app.use(cookieParser());

// config Passprort
app.use(passport.initialize());
app.use(passport.session());
// initRoutes all router
initRoutes(app);

//init get data to session for socketIo for configSocketIo

configSocketIo(io, cookieParser, session.sessionStore);


// initSockets all socket 
initSockets(io);
server.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(`my name app message chat $(hostname):${process.env.APP_PORT}/`);
});


/** -----------------------------------------PEM SSL ---------------------------------------------- */



// import dotenv from "dotenv";
// config openssl for windown
// pem.config({
//   pathOpenSSL: 'C:\\Program Files\\OpenSSL-Win64\\bin\\openssl'
// })

// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//   if (err) {
//     throw err
//   }
//   let app = express();

//   // run function connectDB MongoDB
//   connectDB();
//   // run configSession after run file connectDB
//   configSession(app);
//   // configViewEngin 
//   configViewEngine(app);
//   // enable bodyParser app 
//   app.use(bodyParser.urlencoded({ extended: true }));
//   // enable connectFlash
//   app.use(connectFlash());
//   // config Passprort
//   app.use(passport.initialize());
//   app.use(passport.session());
//   // initRoutes all router
//   initRoutes(app);

//   https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT, process.env.APP_HOST, () => {
//     console.log(`my name app message chat $(hostname):${process.env.APP_PORT}/`);
//   });
// });



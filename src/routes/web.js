import express from "express";
import {home, auth} from "../controllers/indexControllers";
import {authValid} from "../validation/indexValidate";

let router = express.Router();
require('dotenv').config();
/**
 * init all router 
 * tranmission @param app axactly app express module 
 */

 let initRoutes = (app) => 
 {
  router.get("/", home.getHomeController );
  router.get("/login-register", auth.getLoginRegister);
  router.post("/register", authValid.register,auth.postRegister);
  router.get("/verify/:token", auth.verifyAccount );
  
  return app.use("/", router);
 }

 module.exports = initRoutes;
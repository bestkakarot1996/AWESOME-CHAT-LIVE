import express from "express";
import { home, auth } from "../controllers/indexControllers";
import { authValid } from "../validation/indexValidate";
import passport from "passport";
import initPassportLocal from "./../controllers/passportController/local";
import initPassportFacebook from "./../controllers/passportController/facebook";

// init passport Local
initPassportLocal();
initPassportFacebook();

let router = express.Router();
require('dotenv').config();
/**
 * init all router 
 * tranmission @param app axactly app express module 
 */

let initRoutes = (app) => {
  //check logout 
  router.get("/login-register", auth.checkLogoutUser, auth.getLoginRegister);
  router.post("/register", auth.checkLogoutUser , authValid.register, auth.postRegister);
  router.get("/verify/:token", auth.checkLogoutUser , auth.verifyAccount);
  router.post("/login", auth.checkLogoutUser, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-register",
    successFlash: true,
    failureFlash: true
  }));

  router.get("/auth/facebook", passport.authenticate("facebook", {scope: ["email"]} ));
  router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login-register",
  }))
  // check login
  router.get("/", auth.checkLoginUser,  home.getHomeController);
  router.get("/logout", auth.checkLoginUser, auth.getLogoutUser);

  return app.use("/", router);
}

module.exports = initRoutes;
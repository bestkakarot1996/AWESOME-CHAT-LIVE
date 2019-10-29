import express from "express";
import { home, auth, user, contact, notification } from "../controllers/indexControllers";
import { authValid, userValid, contactValid } from "../validation/indexValidate";
import passport from "passport";
import initPassportLocal from "./../controllers/passportController/local";
import initPassportFacebook from "./../controllers/passportController/facebook";
import initPassportGoogle from "./../controllers/passportController/google";

// init passport Local
initPassportLocal();
initPassportFacebook();
initPassportGoogle();

let router = express.Router();
require('dotenv').config();
/**
 * init all router 
 * tranmission @param app axactly app express module 
 */

let initRoutes = (app) => {
  //check logout 
  router.get("/login-register", auth.checkLogoutUser, auth.getLoginRegister);
  router.post("/register", auth.checkLogoutUser, authValid.register, auth.postRegister);
  router.get("/verify/:token", auth.checkLogoutUser, auth.verifyAccount);
  router.post("/login", auth.checkLogoutUser, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-register",
    successFlash: true,
    failureFlash: true
  }));

  router.get("/auth/facebook", auth.checkLogoutUser, passport.authenticate("facebook", { scope: ["email"] }));
  router.get("/auth/facebook/callback", auth.checkLogoutUser, passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login-register",
  }));


  router.get("/auth/google", auth.checkLogoutUser, passport.authenticate("google", { scope: ["email"] }));
  router.get("/auth/google/callback", auth.checkLogoutUser, passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login-register",
  }));
  // check login
  router.get("/", auth.checkLoginUser, home.getHomeController);
  router.get("/logout", auth.checkLoginUser, auth.getLogoutUser);

  router.put("/user/update-avatar", auth.checkLoginUser, user.updateAvatar);
  router.put("/user/update-info", auth.checkLoginUser, userValid.updateInfoUserValidate, user.updateInfo);
  router.put("/user/update-password", auth.checkLoginUser, userValid.updatePasswordValidate, user.updatePassword);


  router.get("/contact/find-users/:keyword", auth.checkLoginUser, contactValid.findUserContactValidate, contact.findUserContact);
  router.post("/contact/add-new", auth.checkLoginUser, contact.addNewContact );
  router.delete("/contact/remove-request-contact-sent", auth.checkLoginUser, contact.removeRequestContactSent);
  router.delete("/contact/remove-request-contact-received", auth.checkLoginUser, contact.removeRequestContactReceived);
  
  router.get("/notification/read-more", auth.checkLoginUser, notification.readMore);
  router.get("/contact/read-more-contacts", auth.checkLoginUser, contact.readMoreContacts);
  router.get("/contact/read-more-contacts-sent", auth.checkLoginUser, contact.readMoreContactSent);
  router.get("/contact/read-more-contacts-recevied", auth.checkLoginUser, contact.readMoreContactRecevied);
  router.put("/notification/mark-all-as-read", auth.checkLoginUser, notification.markAllAsRead);

  return app.use("/", router);
}

module.exports = initRoutes;
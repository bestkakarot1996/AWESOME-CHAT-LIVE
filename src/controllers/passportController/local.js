import passport from "passport";
import passportLocal from "passport-local";
import UserModel from "./../../model/userModel";
import { transErrors, transSuccsess } from "./../../../lang/vi";

let LocalStrategy = passportLocal.Strategy;

/**
 * check init user local 
 */

let initPassportLocal = () => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, password, done) => { // transmission 4 params 1 req, 2 email, 3 password, 4 done  
    try {
      let user = await UserModel.findByEmail(email);
      if (!user) {
        return done(null, false, req.flash("errors", transErrors.login_fail));
      }
      if (!user.local.isActive) {
        return done(null, false, req.flash("errors", transErrors.login_fail_active));
      }
      let checkPassword = await user.comparePassword(password);
      if (!checkPassword) { // promise flase
        return done(null, false, req.flash("errors", transErrors.login_fail));
      }
      return done(null, user, req.flash("success", transSuccsess.loginSuccsess(user.username)));
    } catch (error) {
      console.log(error);
      return done(null, false, req.flash("errors", transErrors.server_errors));
    }
  })); // transmission two 1: object , 2 combatfunction
  // save user login in session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => { //id save serializeUser (up)
    UserModel.findUserById(id)
      .then((user) => {
        return done(null, user)
      }).catch((err) => {
        return done(err, null)
      });
  });
};

module.exports = initPassportLocal;
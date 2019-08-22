import passport from "passport";
import passportFacebook from "passport-facebook";
import UserModel from "./../../model/userModel";
import { transErrors, transSuccsess } from "./../../../lang/vi";

let LocalStrategy = passportFacebook.Strategy;

let fbAppId = process.env.FACEBOOK_APP_ID;
let fbAppSecret = process.env.FACEBOOK_APP_CECRET;
let fbAppCallback = process.env.FACEBOOK_APP_CALLBACK;

/**
 * check init user login facebook
 */

let initPassportFacebook = () => {
  passport.use(new LocalStrategy({
    clientID: fbAppId,
    clientSecret: fbAppSecret,
    callbackURL: fbAppCallback,
    passReqToCallback: true,
    profileFields: ["email", "gender", "displayName"]
  }, async (req, accessToken, refreshToken, profile, done) => { // transmission 4 params 1 req, 2 email, 3 password, 4 done  
    try {
      let user = await UserModel.findByFacebookUid(profile.id);
      if (user) {
        return done(null, user, req.flash("success", transSuccsess.loginSuccsess(user.userName)));
      }
      // nếu chưa login lần nào thì tạo user 
      let userNewItem = {
        userName: profile.displayName,
        gender: profile.gender,
        local: {
          isActive: true,
        },
        facebook: {
          uid: profile.id,
          token: accessToken,
          email: profile.emails[0].value
        }
      };
      // create user in userNewItem
      let userNew = await UserModel.createNew(userNewItem);
      return done(null, userNew, req.flash("success", transSuccsess.loginSuccsess(userNew.userName)));
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

module.exports = initPassportFacebook;
import passport from "passport";
import passportGoogle from "passport-google-oauth";
import UserModel from "./../../model/userModel";
import { transErrors, transSuccsess } from "./../../../lang/vi";

let GoogleStrategy = passportGoogle.OAuth2Strategy;

let ggAppId = process.env.GOOGLE_APP_ID;
let ggAppSecret = process.env.GOOGLE_APP_CECRET;
let ggAppCallback = process.env.GOOGLE_APP_CALLBACK;

/**
 * check init user login google
 */

let initPassportGoogle = () => {
  passport.use(new GoogleStrategy({
    clientID: ggAppId,
    clientSecret: ggAppSecret,
    callbackURL: ggAppCallback,
    passReqToCallback: true,
  }, async (req, accessToken, refreshToken, profile, done) => { // transmission 4 params 1 req, 2 email, 3 password, 4 done  
    try {
      let user = await UserModel.findByGoogleUid(profile.id);
      if (user) {
        return done(null, user, req.flash("success", transSuccsess.loginSuccsess(user.username)));
      }
      console.log(profile);
      // nếu chưa login lần nào thì tạo user 
      let userNewItem = {
        username: profile.displayName,
        gender: profile.gender,
        local: {
          isActive: true,
        },
        google: {
          uid: profile.id,
          token: accessToken,
          email: profile.emails[0].value
        }
      };
      // create user in userNewItem
      let userNew = await UserModel.createNew(userNewItem);
      return done(null, userNew, req.flash("success", transSuccsess.loginSuccsess(userNew.username)));
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

module.exports = initPassportGoogle;
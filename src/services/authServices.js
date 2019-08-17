import userModal from "./../model/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import { transErrors, transSuccsess } from "./../../lang/vi";

let saltRounds = 7;
let register = (email, gender, password) => {
  return new Promise ( async (resolve, reject) => { // creact new promise await auth.register
    let userByEmail = await userModal.findByEmail(email);
    if (userByEmail) {
      if (userByEmail.deletedAt != null ) {
        return reject(transErrors.account_remove);
      }
      if (!userByEmail.local.isActive) {
        return reject(transErrors.account_not_active);
      }
      return reject(transErrors.account_in_user);
    }
    let salt = bcrypt.genSaltSync(saltRounds);
    let userItem = {
      userName: email.split("@")[0],
      gender: gender,
      local: {
        email: email,
        password: bcrypt.hashSync(password, salt), // hash password
        verifyToken: uuidv4()
      }
    };
    let user = await userModal.createNew(userItem);
    resolve(transSuccsess.userCreated(user.local.email));
  });
}

module.exports = {
  register: register
};
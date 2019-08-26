import UserModel from "./../model/userModel";
import { transErrors } from "./../../lang/vi";
import bcrypt from "bcrypt";


const saltRounds = 7;
/**
 * 
 * @param {*} id // userId
 * @param {*} item // data update
 */

let updateUser = (id, item) => {
  return UserModel.updateUser(id, item); // vì sevice return usermodel và usermodel return this.findByIdAndUpdate(id, item).exec(); nên bên controller nó nhận về promises
}

//update password for user => 
/**
 * 
 * @param {userID} id // userId
 * @param {data update} item // data update
 */
let updatePasswords = (id, dataUpdate) => {
  return new Promise(async (resolve, reject) => {
    let currentUser = await UserModel.findUserById(id);
    if (!currentUser) { // if no user 
      return reject(transErrors.trans_user_underfine);
    }
    // check current password 
    let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.currentPassword);
    // check if password user enter != current password for database 
    if (!checkCurrentPassword) {
      return reject(transErrors.user_current_password_flased);
    }
    
    let salt = bcrypt.genSaltSync(saltRounds);
    await UserModel.updatePassword(id, bcrypt.hashSync(dataUpdate.newPassword, salt));
    return resolve(true);
  });
}

module.exports = {
  updateUser: updateUser,
  updatePassword: updatePasswords
};
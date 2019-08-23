import UserModel from "./../model/userModel";

/**
 * 
 * @param {*} id // userId
 * @param {*} item // data update
 */

let updateUser = (id , item) => { 
  return UserModel.updateUser(id,item); // vì sevice return usermodel và usermodel return this.findByIdAndUpdate(id, item).exec(); nên bên controller nó nhận về promises
}

module.exports = { 
  updateUser : updateUser
};
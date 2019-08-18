import userModal from "./../model/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import { transErrors, transSuccsess, transMail, transActiveAccount } from "./../../lang/vi";
import sendMail from "./../config/emailer";

let saltRounds = 7;
let register = (email, gender, password, protocol, host) => {
  return new Promise(async (resolve, reject) => { // creact new promise await auth.register
    let userByEmail = await userModal.findByEmail(email);
    if (userByEmail) {
      if (userByEmail.deletedAt != null) {
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
    // send email confim user
    let linkVerify = `
      ${protocol}://${host}/verify/${user.local.verifyToken}
    `;
    sendMail(email, transMail.subject, transMail.template(linkVerify))
      .then(succsess => {
        resolve(transSuccsess.userCreated(user.local.email));
        console.log(succsess);
      })
      .catch(async (error) => {
        // remove users
        await userModal.removeByID(user._id);
        console.log(error);
        reject(transMail.errors_fail_mail);
      });
  });
}


let verifyAcc = (token) => {
  return new Promise(async (resolve, reject) => {
    let userByToken = await userModal.findByToken(token);
    if (!userByToken) 
    {
      return reject(transActiveAccount.token_undefine);
    }
    await userModal.verify(token);
    resolve(transActiveAccount.account_actived);
  });
}

module.exports = {
  register: register,
  verifyAcc: verifyAcc
};
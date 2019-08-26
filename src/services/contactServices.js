import ContactModel from "./../model/contactModel";
import UserModel from "./../model/userModel";
import _ from "lodash";

let findUserContactServices = (currentUserId, keyword) => {
  return new Promise(async (resolve, reject) => {
    let deprecatedUserIds = [];
    let contactsByUser = await ContactModel.findAllByUser(currentUserId);
    contactsByUser.forEach((contact) => {
      deprecatedUserIds.push(contact.userId);
      deprecatedUserIds.push(contact.contactId);
    });
    // sử dụng lodash để lọc những userId trùng nhau
    deprecatedUserIds = _.uniqBy(deprecatedUserIds);
    console.log(deprecatedUserIds);
    let users = await UserModel.findAllForAddContact(deprecatedUserIds, keyword);
    return resolve(users);
  });
};
module.exports = {
  findUserContactServices: findUserContactServices
};


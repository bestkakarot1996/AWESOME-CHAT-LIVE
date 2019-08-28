import ContactModel from "./../model/contactModel";
import UserModel from "./../model/userModel";
import _ from "lodash";

let findUserContactServices = (currentUserId, keyword) => {
  return new Promise(async (resolve, reject) => {
    let deprecatedUserIds = [currentUserId];
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

let addNewContactServices = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    // Kiểm tra xem có là bạn bè hay chưa, nếu có thì k tạo bản ghi mới và ngược lại
    let contactExists = await ContactModel.checkExists(currentUserId, contactId);
    if (contactExists) {
      return reject(false);
    }

    // TH2: tạo bảng ghi mới
    let newContactItem = {
      userId: currentUserId,
      contactId: contactId
    };

    let newContact = await ContactModel.createNew(newContactItem);
    resolve(newContact);
  });
};

let removeReqContactServices = (userId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeReq = await ContactModel.removeContact(userId, contactId);
    if (removeReq.result.n === 0) {
      return reject(false);
    }
    resolve(true);

  });
}

module.exports = {
  findUserContactServices: findUserContactServices,
  addNewContactServices: addNewContactServices,
  removeReqContactServices: removeReqContactServices
};


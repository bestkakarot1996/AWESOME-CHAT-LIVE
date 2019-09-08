import ContactModel from "./../model/contactModel";
import UserModel from "./../model/userModel";
import NotificationModel from "./../model/notificationModel";
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
    // create notification
    let notificationItem = {
      senderId: currentUserId,
      receiverId: contactId,
      type: NotificationModel.types.ADD_CONTACT,
    };
    // Tạo Id khi người dùng gửi yêu cầu kết bạn cho ai đó , thì gán thống báo về database 
    await NotificationModel.model.createNew(notificationItem);

    resolve(newContact);
  });
};

let removeReqContactServices = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeReq = await ContactModel.removeContact(currentUserId, contactId);
    if (removeReq.result.n === 0) {
      return reject(false);
    }
    // remove notification
    await NotificationModel.model.removeRequestContactNotification(currentUserId, contactId, NotificationModel.types.ADD_CONTACT);

    resolve(true);

  });
};

module.exports = {
  findUserContactServices: findUserContactServices,
  addNewContactServices: addNewContactServices,
  removeReqContactServices: removeReqContactServices
};


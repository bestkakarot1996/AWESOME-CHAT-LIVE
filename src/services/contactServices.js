import ContactModel from "./../model/contactModel";
import UserModel from "./../model/userModel";
import NotificationModel from "./../model/notificationModel";
import _ from "lodash";

const LIMIT_NUMBER_TAKEN = 1;

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


let getContactsBook = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await ContactModel.getContactBook(currentUserId, LIMIT_NUMBER_TAKEN);

      // sử dụng map để lấy được tất cả các thông báo trong bảng ghi 
      let users = contacts.map(async (contact) => {
        if (contact.contactId == currentUserId) {
          return await UserModel.getNormalFindUserDataById(contact.userId); // handel logic code
        } else {
          return await UserModel.getNormalFindUserDataById(contact.contactId);
        }

      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
};

let getContactSent = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await ContactModel.getContactSent(currentUserId, LIMIT_NUMBER_TAKEN);
      // sử dụng map để lấy được tất cả các thông báo trong bảng ghi 
      let users = contacts.map(async (contact) => {
        return await UserModel.getNormalFindUserDataById(contact.contactId);
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error)
    }
  });
};


let getContactReceived = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await ContactModel.contactReceived(currentUserId, LIMIT_NUMBER_TAKEN);
      // sử dụng map để lấy được tất cả các thông báo trong bảng ghi 
      console.log(contacts, "contacts received");

      let users = contacts.map(async (contact) => {
        return await UserModel.getNormalFindUserDataById(contact.userId);
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error)
    }
  });
};


let countAllContactBook = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count =  await ContactModel.countAllContactBook(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error)
    }
  });
};

let countAllContactSent = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await ContactModel.countAllContactSent(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error)
    }
  });
};


let countAllContactReceived = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await ContactModel.countAllContactReceived(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error)
    }
  });
};

let readMoreContacts = (currentUserId, skipNumberContact) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newContactUsers = await ContactModel.getReadMoreContactBook(currentUserId, skipNumberContact, LIMIT_NUMBER_TAKEN);
      // sử dụng map để lấy được tất cả các thông báo trong bảng ghi 
      let getUsersContact = newContactUsers.map(async (contact) => {
        if (contact.contactId == currentUserId) {
          return await UserModel.getNormalFindUserDataById(contact.userId); // handel logic code
        } else {
          return await UserModel.getNormalFindUserDataById(contact.contactId);
        }
      });
      resolve(await Promise.all(getUsersContact))
      
    } catch (error) {
      reject(error);
    }
  });
};


let readMoreContactSent = (currentUserId, skipNumberContactSent) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newContactSent = await ContactModel.getReadMoreContactSent(currentUserId, skipNumberContactSent, LIMIT_NUMBER_TAKEN);
      // sử dụng map để lấy được tất cả các thông báo trong bảng ghi 
      let getUsersContact = newContactSent.map(async (contact) => {
        return await UserModel.getNormalFindUserDataById(contact.contactId);
      });
      resolve(await Promise.all(getUsersContact))
    } catch (error) {
      reject(error);
    }
  });
};

let readMoreContactReceived = (currentUserId, skipNumberContactReceived) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newContactReceived = await ContactModel.getReadMoreContactReceived(currentUserId, skipNumberContactReceived, LIMIT_NUMBER_TAKEN);
      // sử dụng map để lấy được tất cả các thông báo trong bảng ghi 
      let getUsersContact = newContactReceived.map(async (contact) => {
        return await UserModel.getNormalFindUserDataById(contact.userId);
      });
      resolve(await Promise.all(getUsersContact))
    } catch (error) {
      reject(error);
    }
  });
};



module.exports = {
  findUserContactServices: findUserContactServices,
  addNewContactServices: addNewContactServices,
  removeReqContactServices: removeReqContactServices,
  getContactsBook: getContactsBook,
  getContactSent: getContactSent,
  getContactReceived: getContactReceived,
  countAllContactBook: countAllContactBook,
  countAllContactSent: countAllContactSent,
  countAllContactReceived: countAllContactReceived,
  readMoreContacts: readMoreContacts,
  readMoreContactSent: readMoreContactSent,
  readMoreContactReceived: readMoreContactReceived
};


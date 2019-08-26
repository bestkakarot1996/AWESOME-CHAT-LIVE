import { contact } from "./../services/indexServices";
import { validationResult } from "express-validator/check";


let findUserContact = async (req, res) => {
  // show Error when users enter wrong 
  let errorArray = [];

  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArray.push(item.msg);
    });
    return res.status(500).send(errorArray);
  }

  try {
    // lấy id người dùng hiện tại trong session
    let currentUserId = req.user._id;
    // params.keyword = keyword trong router
    let keyword = req.params.keyword;

    // xử lý data logic và gán vào users
    let users = await contact.findUserContactServices(currentUserId, keyword);
    return res.render("main/contacts/sections/_findUsersContact", { users });
  } catch (error) {
    return res.status(500).send(error);

  }
};
module.exports = {
  findUserContact: findUserContact
};


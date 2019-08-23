import multer from "multer";
import { app } from "./../config/app";
import { transErrors, transSuccsess } from "./../../lang/vi";
import uuidv4 from "uuid/v4";
import { user } from "./../services/indexServices";
import fsExtra from "fs-extra";
// nơi upload image
let storageAvatar = multer.diskStorage({
  destination: (res, file, callback) => {
    callback(null, app.avatar_directory) // nơi lưu trữ image: đường dẫn đc lưu ở file config để sau dễ bảo trì 
  },
  filename: (res, file, callback) => { // kiểm tra file ở phía frontend : validate phía backend
    let tailImage = app.avatar_type;
    if (tailImage.indexOf(file.mimetype) === -1) { // nếu file trả lên server không tồn tại các đuổi ảnh trong array tailImage
      return callback(transErrors.avatarType_errors, null);
    }
    // TH không lỗi 
    // lấy tên ảnh đúng khi user update cùng tên ảnh nhưng 2 ảnh khác nhau  && TH nhiều user cùng update 1 lần
    let avatarName = `${Date.now}-${uuidv4()}-${file.originalname}`;
    callback(null, avatarName);
  }
});

// TH 
let avatarUploadFile = multer({
  storage: storageAvatar,
  limits: { fileSize: app.avatar_limit_file }
}).single("avatar");

let updateAvatar = (req, res) => {
  avatarUploadFile(req, res, async (error) => {
    if (error) {
      if (error.message) { // nếu có lỗi  MulterError: File too large phía server
        return res.status(500).send(transErrors.avatarLimits_errors);
      }
      return res.status(500).send(error);
    }
    try {
      let updateUserItem = { // update Avatar
        avatar: req.file.filename,
        updateAt: Date.now()
      };
      // update user
      let userUpdate = await user.updateUser(req.user._id, updateUserItem);
      // remove avata cũ dùng fs-extra
     // await fsExtra.remove(`${app.avatar_directory}/${userUpdate.avatar}`); // xóa ảnh ở đường dẫn , // trả về dữ liệu cũ sau khi nó update
      // trả kết quả về 
      let result = { 
        message: transSuccsess.avatarUpdate,
        imageSrc: `/images/users/${req.file.filename}`  // đường dẫn mới
      }
      return res.status("200").send(result);
    } catch (error) {
      console.log(error);
    }
  });
}; // truyền đến fromData



module.exports = {
  updateAvatar: updateAvatar
};
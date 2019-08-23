import { check } from "express-validator/check";
import { transValidation } from "./../../lang/vi";
let updateInfoUserValidate = [
  check("username", transValidation.update_username)
    .optional()     // được phép null khi người dùng không update username    
    .isLength({ min: 3, max: 17 })
    .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
    ),
  check("gender", transValidation.update_gender)
    .optional()
    .isIn("male", "female"),
  check("address", transValidation.update_address)
    .optional()
    .isLength({ min: 3, max: 50 }),
  check("phone", transValidation.update_phone)
    .optional()
    .matches(/^(0)[0-9]{9,10}$/)
];

let login = [

];

module.exports = {
  updateInfoUserValidate: updateInfoUserValidate
}
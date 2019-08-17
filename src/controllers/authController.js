import { validationResult } from "express-validator/check";

let getLoginRegister = (req, res) => {
  return res.render("authLogin/master");
}

let postRegister = (req, res) => {
  // show Error when users enter wrong 
  let errorArray = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArray.push(item.msg);
    });
    console.log(errorArray);
    return;
  }
  // show Error when users enter exactly
  console.log(req.body);
  
}

module.exports = {
  getLoginRegister: getLoginRegister,
  postRegister: postRegister
};
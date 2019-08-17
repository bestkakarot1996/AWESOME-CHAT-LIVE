export const transValidation = {
  email_incorrect: "Email phải có định dạng là example@gmail.com",
  gender_incorrect: "Không được thay đổi giới tính tùy ý !",
  password_incorrect: "Mật khẩu yêu cầu phải 8 ký tự bao gồm: Chữ in hoa, chữ thường và số",
  password_ConfimIncorrect: "Mật khẩu không trùng khớp. Mời nhập lại"
 };


 export const transErrors = { 
   account_in_user: "Email đã được sử dụng !",
   account_remove: "Email đã bị gỡ khỏi hệ thống , nếu điều này không đúng. Vui lòng liên hệ admin 0901974704",
   account_not_active: "Emai này đã được đăng ký nhưng chưa kích hoạt. Vui lòng hãy kích hoạt hoặc liên hệ với admin 0901974704"
 };

 export const transSuccsess = { 
   userCreated: (userEmail) => {
      return `Email <b>${userEmail}</b> tạo thành công. Vui lòng kiểm tra email để kích hoạt tài khoản !`
   }
 };
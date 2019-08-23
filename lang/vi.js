export const transValidation = {
  email_incorrect: "Email phải có định dạng là example@gmail.com",
  gender_incorrect: "Không được thay đổi giới tính tùy ý !",
  password_incorrect: "Mật khẩu yêu cầu phải 8 ký tự bao gồm: Chữ in hoa, chữ thường và số",
  password_ConfimIncorrect: "Mật khẩu không trùng khớp. Mời nhập lại",

  update_username: "UserName giới hạn trong khoản 3 - 7 ký tự và không được chứa các ký tự đặc biệt" ,
  update_gender : "Oops! Dữ liệu giới tính có vấn đề. Bạn là hackker chăng ?" , 
  update_address: "Địa chỉ giới hạn 3 - 70 ký tự" ,
  update_phone: "Số điện thoại bắt đầu bằng số 0 và chứa 3 - 12 ký tự"
 };


 export const transErrors = { 
   account_in_user: "Email đã được sử dụng !",
   account_remove: "Email đã bị gỡ khỏi hệ thống , nếu điều này không đúng. Vui lòng liên hệ admin 0901974704",
   account_not_active: "Emai này đã được đăng ký nhưng chưa kích hoạt. Vui lòng hãy kích hoạt hoặc liên hệ với admin 0901974704",
   login_fail : "Đăng nhập không thành công !",
   login_fail_active: "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt !",
   server_errors: "Có lỗi trong quá trình xử lý. Vui lòng liên hệ 0901974704 để báo cáo lỗi. Xin cám ơn!",
   avatarType_errors: "Đuôi ảnh không hợp lệ ! Vui lòng sử dụng đuôi ảnh có dạng jpg, png, jpeg",
   avatarLimits_errors : "Kích thước ảnh quá mức cho phép. Vui lòng sử dụng ảnh 1M"
 };

 export const transSuccsess = { 
   userCreated: (userEmail) => {
      return `Email <b>${userEmail}</b> tạo thành công. Vui lòng kiểm tra email để kích hoạt tài khoản !`
   },
   loginSuccsess: (userName) => {
     return `Xin chào ${userName} bạn đã đăng nhập thành công! Chúc bạn một ngày tốt lành !`
   },
   logoutSuccsess: "Đăng xuất tài khoản thành công  !",
   user_info_updated : "Cập nhật thông tin người dùng thành công"
  };
  
  export const transMail = { 
    subject: "Asomechat: Kích hoạt tài khoản",
    template: (linkVerify) => {
      return `
      <h2>Bạn đã đăng ký thành công ứng dụng chat trên Asome chat</h2>
      <h3>Vui lòng click vào link bên dưới để kích hoạt tài khoản</h3>
      <h3><a href="${linkVerify}" target="blank"></a>${linkVerify}</h3>
      <h4>Xin cám ơn!</h4>
      `
    },
    errors_fail_mail: "Có lỗi trong quá trình đăng ký. Vui lòng liên hệ admin 0901974704. Xin cám ơn!"
  };
  
  
  export const transActiveAccount = {
    account_actived: "Tài khoản kích hoạt thành công !",
    token_undefine: "Tài khoản đã được kích hoạt. Vui lòng không kích hoạt lại nữa. Xin cám ơn !"
 };



let userAvatar = null;
let userInfo = {}; // dữ liệu đã được sửa để push lên server
let originAvatarSrc = null;
let originUserInfo = {};

let userUpdatePassword = {};

function callLogout() {
  let timerInterval;
  Swal.fire({
    position: "top-end",
    title: "Tự động đăng xuất sau 5 giây",
    html: "Thời gian <strong></strong>",
    timer: 5000,
    onBeforeOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {
        Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimerLeft() / 1000);
      }, 1000)
    },
    onClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    $.get("/logout", function () {
      location.reload();
    })
  });
};


function updateUserInfo() {
  $('#input-change-avatar').bind('change', function () {
    let fileData = $('#input-change-avatar').prop("files")[0];
    let tailImage = ["image/png", "image/jpg", "image/jpeg"];
    let limit = 1048576; // byte = 1M;
    // if file fileData do not exits: neus file fileData không tồn tại
    if ($.inArray(fileData.type, tailImage) === -1) {
      alertify.notify("Đuôi ảnh không hợp lệ ! Vui lòng sử dụng đuôi ảnh có dạng jpg, png, jpeg", "error", 5);
      $('#input-change-avatar').val(null); // refresh value : f5 lại dữ liệu nếu có lỗi 
      return false; // stop 
    };
    // if file fileData oversize : nếu như hình ảnh quá kích thước 
    if (fileData.size > limit) {
      alertify.notify("Kích thước ảnh quá mức cho phép. Vui lòng sử dụng ảnh 1M", "error", 5);
      $('#input-change-avatar').val(null); // refresh value : f5 lại dữ liệu nếu có lỗi 
      return false; // stop 
    };
    // show image : show ảnh tạm thời 
    if (typeof (FileReader) != "undefined") { // có tồn tại FileReader 
      let imagePreView = $("#image-edit-profile");
      imagePreView.empty(); // làm rỗng thẻ div chứa ảnh trước 

      let fileReader = new FileReader();
      fileReader.onload = function (element) {
        // ghi đè ảnh mới lên ảnh cũ
        $("<img>", {
          "src": element.target.result, // lấy thuộc tính ảnh mới
          "class": "avatar img-circle",
          "id": "user-model-avatar",
          "alt": "avatar"
        }).appendTo(imagePreView); // bỏ ảnh mới vào file làm rổng
      };
      imagePreView.show();
      fileReader.readAsDataURL(fileData);

      // TH nếu ảnh hợp lệ thì append vào fromdata
      let formData = new FormData();
      formData.append("avatar", fileData);

      userAvatar = formData;
    }
    else {
      alertify.notify("Trình duyệt của bạn không hổ trợ FileReader");
    }

  });
  // ghi dữ liệu mới USERNAME // dữ liệu đã được sửa để push lên server
  $('#input-change-username').bind("change", function () {
    let username = $('#input-change-username').val();
    let regexUsername = new RegExp("[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$");
    if (!regexUsername.test(username) || username.length < 3 || username.length > 17) { // nếu flase
      alertify.notify("UserName giới hạn trong khoản 3 - 7 ký tự và không được chứa các ký tự đặc biệt", "error", 7);
      $('#input-change-username').val(originUserInfo.username); // gán lại giá trị gốc ban đầu vì lúc này người dùng đã nhập sai
      delete userInfo.username;
      return false;
    }
    userInfo.username = usernames;
  });

  // ghi dữ liệu mới GENDER
  $('#input-change-gender-male').bind("click", function () {
    let gender = $('#input-change-gender-male').val();

    if (gender !== "male") {
      alertify.notify("Oops! Dữ liệu giới tính có vấn đề. Bạn là hackker chăng ?", "error", 7);
      $('#input-change-gender-male').val(originUserInfo.gender); // gán lại giá trị gốc ban đầu vì lúc này người dùng đã nhập sai
      delete userInfo.gender;
      return false;
    };

    userInfo.gender = gender;
  });

  $('#input-change-gender-female').bind("click", function () {
    let gender = $('#input-change-gender-female').val();

    if (gender !== "female") {
      alertify.notify("Oops! Dữ liệu giới tính có vấn đề. Bạn là hackker chăng ?", "error", 7);
      $('#input-change-gender-female').val(originUserInfo.gender); // gán lại giá trị gốc ban đầu vì lúc này người dùng đã nhập sai
      delete userInfo.gender;
      return false;
    }

    userInfo.gender = gender;
  });

  // ghi dữ liệu mới ADDRESS
  $('#input-change-address').bind("change", function () {
    let address = $('#input-change-address').val();

    if (address.length < 3 || address.length > 70) {
      alertify.notify("Địa chỉ giới hạn 3 - 70 ký tự", "error", 7);
      $("#input-change-address").val(originUserInfo.address);
      delete userInfo.address;
      return false;
    }

    userInfo.address = address;
  });


  // ghi dữ liệu mới PHONE
  $('#input-change-phone').bind("change", function () {
    let phone = $('#input-change-phone').val();
    let regexPhone = new RegExp(/^(0)[0-9]{9,10}$/);

    if (!regexPhone.test(phone)) {
      alertify.notify("Số điện thoại bắt đầu bằng số 0 và chứa 3 - 12 ký tự", "error", 7);
      $("#input-change-phone").val(originUserInfo.phone);
      delete userInfo.phone;
      return false;
    }

    userInfo.phone = phone;
  });

  /**-----------------------------------VALIDATE PASSWORD-------------------------------- */

  // ghi dữ liệu mới CURRENT PASSWORD
  $("#input-change-current-password").bind("change", function () {
    let currentPassword = $("#input-change-current-password").val();

    let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);
    if (!regexPassword.test(currentPassword)) {
      alertify.notify("Mật khẩu yêu cầu phải 8 ký tự bao gồm: Chữ in hoa, chữ thường và số", "error", 7);
      $("#input-change-current-password").val(null);
      delete userUpdatePassword.currentPassword;
      return false;
    }
    userUpdatePassword.currentPassword = currentPassword;
  });

  // ghi đè dữ liệu mới NEW PASSWORD

  $("#input-change-new-password").bind("change", function () {
    let newPassword = $("#input-change-new-password").val();

    let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);
    if (!regexPassword.test(newPassword)) {
      alertify.notify("Mật khẩu yêu cầu phải 8 ký tự bao gồm: Chữ in hoa, chữ thường và số", "error", 7);
      $("#input-change-new-password").val(null);
      delete userUpdatePassword.newPassword;
      return false;
    }
    userUpdatePassword.newPassword = newPassword;
  });

  // kiểm tra ghi đè dữ liệu COMFIRM PASSWORD

  $("#input-change-confirm-new-password").bind("change", function () {
    let comfirmPasword = $("#input-change-confirm-new-password").val();

    if (!userUpdatePassword.newPassword) { // nope pass
      alertify.notify("Bạn chưa nhập mật khẩu mới. Vui lòng nhập !", "error", 7);
      $("#input-change-confirm-new-password").val(null);
      delete userUpdatePassword.comfirmPasword;
      return false;
    }
    if (comfirmPasword !== userUpdatePassword.newPassword) { // nope pass
      alertify.notify("Mật khẩu không trùng khớp. Vui lòng nhập lại!", "error", 7);
      $("#input-change-confirm-new-password").val(null);
      delete userUpdatePassword.comfirmPasword;
      return false;
    }
    userUpdatePassword.comfirmPasword = comfirmPasword;
  });

};




// put ajax update to server:  goi ajax lên server 
function callUpdateUserAvatar() {
  $.ajax({
    url: "/user/update-avatar",
    type: "PUT",
    cache: false,
    contentType: false,
    processData: false,
    data: userAvatar,
    success: function (result) {
      console.log(result);
      // display show success 
      $(".user-model-alert-success").find("span").text(result.message); // message bên Usercontroller
      $(".user-model-alert-success").css("display", "block");
      // update avatar lên navbar
      $("#navbar-avatar").attr("src", result.imageSrc);

      // update thành công thì sửa lại avatar cũ
      originAvatarSrc = result.imageSrc;
      $("#input-btn-cancel-update-user").click(); // tự động click reset 
    },
    error: function (error) {
      // display show error 
      $(".user-model-alert-error").find("span").text(error.responseText); // ghi đè lỗi
      console.log(error.responseText);
      $(".user-model-alert-error").css("display", "block");

      // reset all 
      $("#input-btn-cancel-update-user").click(); // tự động click reset 
    }

  });
}

function callUpdateUserInfo() {
  $.ajax({
    url: "/user/update-info",
    type: "PUT",
    data: userInfo, // dữ liệu đã được sửa để push lên server
    success: function (result) {
      console.log(result);
      // display show success 
      $(".user-model-alert-success").find("span").text(result.message); // message bên Usercontroller
      $(".user-model-alert-success").css("display", "block");

      // update originUserInfo
      originUserInfo = Object.assign(originUserInfo, userInfo);

      // update username navbar
      $("#navbar-username").text(originUserInfo.username);

      // tự động click reset 
      $("#input-btn-cancel-update-user").click();
    },
    error: function (error) {
      // display show error 
      $(".user-model-alert-error").find("span").text(error.responseText); // ghi đè lỗi
      console.log(error.responseText);
      $(".user-model-alert-error").css("display", "block");

      // reset all 
      $("#input-btn-cancel-update-user").click(); // tự động click reset 
    }

  });
};

function callUpdateUserPassword() {
  $.ajax({
    url: "/user/update-password",
    type: "PUT",
    data: userUpdatePassword, // dữ liệu đã được sửa để push lên server
    success: function (result) {
      console.log(result);
      // display show success 
      $(".user-model-password-alert-success").find("span").text(result.message); // message bên Usercontroller
      $(".user-model-password-alert-success").css("display", "block");
      $("#input-btn-cancel-password").click();
      // auto logout change update password user 
      callLogout();
    },
    error: function (error) {
      // display show error 
      $(".user-model-password-alert-error").find("span").text(error.responseText); // ghi đè lỗi
      console.log(error.responseText);
      $(".user-model-password-alert-error").css("display", "block");

      // reset all 
      $("#input-btn-cancel-password").click(); // tự động click reset 

    }

  });
}

// lắng nghe sự kiện
$(document).ready(function () {
  originAvatarSrc = $("#user-model-avatar").attr("src"); // lấy src image và gán vào originAvatarSrc
  originUserInfo = {
    username: $('#input-change-username').val(),
    gender: ($('#input-change-gender-male').is(":checked")) ? $('#input-change-gender-male').val() : $('#input-change-gender-female'),  //dùng toán tử 3 ngôi  
    address: $('#input-change-address').val(),
    phone: $('#input-change-phone').val()
  };

  // update userInfo after change value to update : update userInfo sau khi thay đổi các trường input
  updateUserInfo();

  // kiểm tra sự kiện click 
  $("#input-btn-update-user").bind("click", function () {
    if ($.isEmptyObject(userInfo) && !userAvatar) {  // nếu userInfo null và userAvatar = null 
      alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu", "error", 5);
    }
    if (userAvatar) { // if tồn tại (nếu avatar bị thay đổi)
      callUpdateUserAvatar(); // call fuction ajax update avatar
    }
    if (!$.isEmptyObject(userInfo)) { // nếu thông tin bị sửa
      callUpdateUserInfo();
    }
  });

  // delete data input user enter 
  $("#input-btn-cancel-update-user").bind("click", function () {
    userAvatar = null;
    userInfo = {};
    $("#input-change-avatar").val(null);
    // khi hủy thì phải lấy lại đc giá trị src ban đầu
    $("#user-model-avatar").attr("src", originAvatarSrc);
    // khi ấn nút hủy bỏ thì lấy giá trị gốc trả về input 
    $('#input-change-username').val(originUserInfo.username);
    (originUserInfo.gender === "male") ? $('#input-change-gender-male').click() : $('#input-change-gender-female').click();
    $('#input-change-address').val(originUserInfo.address);
    $('#input-change-phone').val(originUserInfo.phone);
  });

  /**---------------------------------READY UPDATE PASSWORD--------------------------------------- */
  // kiểm tra sự kiện click update user password 
  $("#input-btn-update-password").bind("click", function () {
    if (!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.comfirmPasword) {
      alertify.notify("Bạn phải thay đổi đầy đủ thông tin", "error", 7);
      return false;
    }

    Swal.fire({
      title: "Bạn có chắc chắn muốn thay đổi mật khẩu?",
      text: "Bạn không thể hoàn tác lại quá trình này!",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#2ECC71",
      cancelButtonColor: "#ff7675",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (!result.value) {
        $("#input-btn-cancel-password").click();
        return false;
      }
      callUpdateUserPassword();
    });

  });
  // cancel (reset) from input password 
  $("#input-btn-cancel-password").bind("click", function () {
    userUpdatePassword = {};
    $("#input-change-current-password").val(null);
    $("#input-change-new-password").val(null);
    $("#input-change-confirm-new-password").val(null);
    console.log(userUpdatePassword);
  });

});

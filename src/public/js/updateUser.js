let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
function updateUserInfo() {
  $('#input-change-avatar').bind('change', function () {
    let fileData = $('#input-change-avatar').prop("files")[0];
    let tailImage = ["image/png", "image/jpg", "image/jpeg"];
    let limit = 1048576; // byte = 1M;
    // // if file fileData do not exits: neus file fileData không tồn tại
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
  // ghi dữ liệu mới USERNAME
  $('#input-change-username').bind("change", function () {
    userInfo.userName = $('#input-change-username').val();
  });

  // ghi dữ liệu mới GENDER
  $('#input-change-gender-male').bind("click", function () {
    userInfo.gender = $('#input-change-gender-male').val();
  });

  $('#input-change-gender-female').bind("click", function () {
    userInfo.gender = $('#input-change-gender-female').val();
  });

  // ghi dữ liệu mới ADDRESS
  $('#input-change-address').bind("change", function () {
    userInfo.address = $('#input-change-address').val();
  });


  // ghi dữ liệu mới PHONE
  $('#input-change-phone').bind("change", function () {
    userInfo.phone = $('#input-change-phone').val();
  });

};

// lắng nghe sự kiện

$(document).ready(function () {
  updateUserInfo();

  originAvatarSrc = $("#user-model-avatar").attr("src"); // lấy src image và gán vào originAvatarSrc
  // kiểm tra sự kiện click 
  $("#input-btn-update-user").bind("click", function () {
    if ($.isEmptyObject(userInfo) && !userAvatar) {  // nếu userInfo null và userAvatar = null 
      alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu", "error", 5);
    }
    // console.log(userAvatar);
    // console.log(userInfo);
    // put ajax update to server:  goi ajax lên server 
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

    })


  });
  // delete data input user enter 
  $("#input-btn-cancel-update-user").bind("click", function () {
    userAvatar = null;
    userInfo = null;
    $("#input-change-avatar").val(null);
    $("#user-model-avatar").attr("src", originAvatarSrc); // khi hủy thì phải lấy lại đc giá trị src ban đầu
  });
});
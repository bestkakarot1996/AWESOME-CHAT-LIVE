function removeRequestContactReceived() {
  $(".user-remove-request-contact-received").unbind("click").on("click", function () {
    let targetId = $(this).data("uid"); // lấy uid tại tata-uid html
    // tạo bảng ghi contact
    $.ajax({
      url: "/contact/remove-request-contact-received",
      type: "DELETE",
      data: { uid: targetId },
      success: function (data) {
        if (data.success) {

          decreaseNumberNotification("noti_contact_counter", 1);
          decreaseNumberNotiContact("count-request-contact-received");
          // remove tab addfriend (yêu cầu kết bạn)
          $("#request-contact-received").find(`li[data-uid = ${targetId}]`).remove();
          // init socket io
          socket.emit("remove-request-contact-received", { contactId: targetId });
        }
      }
    });
  });
};

// Server socket gửi về user  
socket.on("response-remove-request-contact-received", function (user) {
  $("#find-user").find(`div.user-remove-request-contact-sent[data-uid=${user.id}]`).hide();
  $("#find-user").find(`div.user-add-new-contact[data-uid=${user.id}]`).css("display", "inline-block");


  // remove tab addfriend (đang chờ kết bạn) 
  $("#request-contact-received").find(`li[data-uid=${user.id}]`).remove();
  decreaseNumberNotiContact("count-request-contact-sent");
  // xóa ở thông báo
  increaseNumberNotification("noti_contact_counter", 1);
});

$(document).ready(function () {
  removeRequestContactReceived();
});




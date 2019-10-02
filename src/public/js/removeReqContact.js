function removeReqContact() {
  $(".user-remove-request-contact").bind("click", function () {
    let targetId = $(this).data("uid"); // lấy uid tại tata-uid html
    console.log(targetId);
    // tạo bảng ghi contact
    $.ajax({
      url: "/contact/remove-request-contact",
      type: "DELETE",
      data: { uid: targetId },
      success: function (data) {
        if (data.success) {
          $("#find-user").find(`div.user-remove-request-contact[data-uid=${targetId}]`).hide();
          $("#find-user").find(`div.user-add-new-contact[data-uid=${targetId}]`).css("display", "inline-block");
          quantityRemoveReqContactNotify("count-request-contact-sent");
          // remove tab addfriend (đang chờ kết bạn) 
          $("#request-contact-sent").find(`li[data-uid=${targetId}]`).remove();
          // init socket io
          socket.emit("remove-request-contact", { contactId: targetId });
        }
      }
    })
  });
};

// Server socket gửi về user  
socket.on("response-remove-request-contact", function (user) {
  // delete popup notification
  $(".noti_content").find(`div[data-uid = ${user.id}]`).remove();
  $("ul.list-notifications").find(`li>div[data-uid = ${user.id}]`).parent().remove(); // xóa ở modal notifi
  // remove tab addfriend (yêu cầu kết bạn)
  $("#request-contact-received").find(`li[data-uid = ${user.id}]`).remove();
  quantityRemoveReqContactNotify("count-request-contact-received");
  // xóa ở thông báo
  quantityRemoveReqNotifycation("noti_contact_counter", 1);
  quantityRemoveReqNotifycation("noti_counter", 1);
});
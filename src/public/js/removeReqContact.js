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
  // remove tab addfriend
  quantityRemoveReqContactNotify("count-request-contact-received");
  // xóa ở thông báo
  quantityRemoveReqNotifycation("noti_contact_counter");
  quantityRemoveReqNotifycation("noti_counter");
});
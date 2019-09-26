// function addContact được gọi sau khi ajax trả về cả thẻ li bạn bè . Vì thế nên không thể gọi hàm chạm ở file này
function addContact() {
  $(".user-add-new-contact").bind("click", function () {
    let targetId = $(this).data("uid"); // lấy uid tại tata-uid html
    console.log(targetId);
    // tạo bảng ghi contact
    $.post("/contact/add-new", { uid: targetId }, function (data) {
      if (data.success) {
        $("#find-user").find(`div.user-add-new-contact[data-uid=${targetId}]`).hide();
        $("#find-user").find(`div.user-remove-request-contact[data-uid=${targetId}]`).css("display", "inline-block");
        quantityAddContactNotify("count-request-contact-sent");
        // init socket io
        socket.emit("add-new-contact", { contactId: targetId });
      }
    })
  });
};


// Server socket gửi về user  
socket.on("response-add-new-contact", function (user) {
  let notify = `
  <div class="noti-readed-false" data-uid="${user.id}">
  <img class="avatar-small" src="./images/users/${user.avatar}" alt=""> 
  <strong>${user.username}</strong> đã gửi cho bạn một lời mời kết bạn!
</div>
`;
  $(".noti_content").prepend(notify); //popup notif
  $("ul.list-notifications").prepend(`<li>${notify}</li>`) //modal notif

  quantityAddContactNotify("count-request-contact-received");
  quantityAddNotifycation("noti_contact_counter");
  quantityAddNotifycation("noti_counter");
});
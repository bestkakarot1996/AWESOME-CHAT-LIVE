// function addContact được gọi sau khi ajax trả về cả thẻ li bạn bè . Vì thế nên không thể gọi hàm chạm ở file này
function addContact() {
  $(".user-add-new-contact").bind("click", function () {
    let targetId = $(this).data("uid"); // lấy uid tại tata-uid html
    console.log(targetId);
    // tạo bảng ghi contact
    $.post("/contact/add-new", { uid: targetId }, function (data) {
      if (data.success) {
        $("#find-user").find(`div.user-add-new-contact[data-uid=${targetId}]`).hide();
        $("#find-user").find(`div.user-remove-request-contact-sent[data-uid=${targetId}]`).css("display", "inline-block");
       
        increaseNumberNotification("noti_contact_counter", 1);
        increaseNumberNotiContact("count-request-contact-sent");
        // Thêm ở model tab yêu cầu xác nhận
        let userInfoHtml = $("#find-user").find(`ul li[data-uid=${targetId}]`).get(0).outerHTML; // lấy và in ra html
        console.log(userInfoHtml);
        $("#request-contact-sent").find("ul").prepend(userInfoHtml);
        removeRequestContactSent();
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

  increaseNumberNotiContact("count-request-contact-received"); 

  increaseNumberNotification("noti_contact_counter", 1);
  increaseNumberNotification("noti_counter", 1);

  // Thêm ở model tab đang chờ xác nhận
  let userInfoHtml = `           
  <li class="_contactList" data-uid="${user.id}">
                                  <div class="contactPanel">
                                      <div class="user-avatar">
                                          <img src="./images/users/${user.avatar}" alt="">
                                      </div>
                                      <div class="user-name">
                                          <p>
                                            ${user.username}
                                          </p>
                                      </div>
                                      <br>
                                      <div class="user-address">
                                          <span>&nbsp ${user.address}</span>
                                      </div>
                                      <div class="user-acccept-contact-received" data-uid="${user.id}">
                                          Chấp nhận
                                      </div>
                                      <div class="user-remove-request-contact-received action-danger"
                                          data-uid="${user.id}">
                                          Xóa yêu cầu
                                      </div>
                                  </div>
                                </li>
  `
  $("#request-contact-received").find("ul").prepend(userInfoHtml);
  removeRequestContactReceived();
});
function markNotificationsAsRead(targetUsers) {
  $.ajax({
    url: "/notification/mark-all-as-read",
    type: "PUT",
    data: {
      targetUsers: targetUsers
    },
    success: function (result) {
      if (result) {
        targetUsers.forEach(function (uid) {
          $(".noti_content").find(`div[data-uid=${uid}]`).removeClass("noti-readed-false");
          $("ul.list-notifications").find(`div[data-uid=${uid}]`).removeClass("noti-readed-false");
        });
        decreaseNumberNotification("noti_counter", targetUsers.length);
      }
    }
  });
}

// link popup 
$(document).ready(function () {
  $("#popup-notifi-mark-as-read").bind("click", function () {
    let targetUsers = [];
    $(".noti_content").find("div.noti-readed-false").each(function (index, notification) {
      targetUsers.push($(notification).data("uid"));
    }); // array jquery DOM -->  each no forEach
    if (!targetUsers) {
      alertify.notify("Bạn không còn thông báo nào chưa đọc", "error", 7);
      return false;
    }
    markNotificationsAsRead(targetUsers);
  });
});
// modal notifications
$(document).ready(function () {
  $("#modal-notifi-mark-as-read").bind("click", function () {
    let targetUsers = [];
    $("ul.list-notifications").find("li>div.noti-readed-false").each(function (index, notification) {
      targetUsers.push($(notification).data("uid"));
    }); // array jquery DOM -->  each
    if (!targetUsers.length) {
      alertify.notify("Bạn không còn thông báo nào chưa đọc", "error", 7);
      return false;
    }
    // gọi ajax lên server
    markNotificationsAsRead(targetUsers);
  });
});
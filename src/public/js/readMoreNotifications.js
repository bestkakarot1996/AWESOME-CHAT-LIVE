$(document).ready(function () {
  $("#link-read-more-notifi").bind("click", function () {
    let skipNumber = $("ul.list-notifications").find("li").length;
    $("#link-read-more-notifi").css("display", "none");
    $(".read-more-loading").css("display", "inline-block");
    setTimeout(() => {
      $.get(`/notification/read-more?skipNumber=${skipNumber}`, function (notifications) {
        if (!notifications.length) {
          alertify.notify("Bạn không còn thông báo nào để xem", "error", 7);
          $("#link-read-more-notifi").css("display", "inline-block");
          $(".read-more-loading").css("display", "none");
          return false;
        }
        notifications.forEach(function (notification) {
          $("ul.list-notifications").append(`<li>${notification}</li>`) //modal notifi
        });
        $("#link-read-more-notifi").css("display", "inline-block");
        $(".read-more-loading").css("display", "none");
      })
    }, 1000)
  })
});

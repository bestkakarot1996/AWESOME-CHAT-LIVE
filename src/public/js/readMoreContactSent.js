$(document).ready(function () {
  $("#link-read-more-contact-sent").bind("click", function () {
    let skipNumber = $("#request-contact-sent").find("li").length;
    $("#link-read-more-contact-sent").css("display", "none");
    $(".read-more-contact-sent-loading").css("display", "inline-block");
    setTimeout(() => {
      $.get(`/contact/read-more-contacts-sent?skipNumber=${skipNumber}`, function (newContactSent) {
        if (!newContactSent.length) {
          alertify.notify("Bạn không còn danh sách nào để xem", "error", 7);
          $("#link-read-more-contact-sent").css("display", "inline-block");
          $(".read-more-contact-sent-loading").css("display", "none");
          return false;
        }
        newContactSent.forEach(function (user) {
          $("#request-contact-sent").find("ul")
          .append(`
          <li class="_contactList" data-uid="${user._id}">
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
                                            <span>&nbsp ${user.address !== null ? user.address : ""}</span>
                                        </div>
                                        <div class="user-remove-request-contact-sent action-danger" data-uid="${user.avatar}">
                                            Hủy yêu cầu
                                        </div>
                                    </div>
                                </li>
          `) 
        });
        removeRequestContactSent();
        $("#link-read-more-contact-sent").css("display", "inline-block");
        $(".read-more-contact-sent-loading").css("display", "none");
      })
    }, 1000)
  })
});

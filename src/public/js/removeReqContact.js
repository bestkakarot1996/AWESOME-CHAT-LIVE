function quantityRemoveReqContactNotify(className) {
  let currentValue = +$(`.${className}`).find("em").text();
  currentValue -= 1;
  if (currentValue === 0) {
    $(`.${className}`).html(null);
  }
  else {
    $(`.${className}`).html(`(<em>${currentValue}</em>)`);
  }
};


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
        }
      }
    })
  });
};

function callFindUsers(element) {
  if (element.which === 13 || element.type === "click") {
    let keyword = $("#input-find-users-contact").val();

    let regexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);

    if (!keyword.length) {
      alertify.notify("Bạn chưa nhập nội dung tìm kiếm", "error", 7);
      return false;
    }
    if (!regexKeyword.test(keyword)) {
      alertify.notify("Lỗi từ khóa tìm kiếm. Vui lòng không nhập ký tự", "error", 7);
      return false;
    }
    // get ajax up req server
    $.get(`/contact/find-users/${keyword}`, function (data) {
      $("#find-user ul").html(data);
      // gọi hàm này ở addContact. Vì khi ajax trả về các li bạn bè thì mới addContact.js
      addContact(); 
      removeRequestContactSent();
    });
  }
};

$(document).ready(function () {
  $("#input-find-users-contact").bind("keypress", callFindUsers);
  $("#btn-find-users-contact").bind("click", callFindUsers);
});

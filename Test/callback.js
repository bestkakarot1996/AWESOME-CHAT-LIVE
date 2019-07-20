let sum = (a, b, callback) => {
  setTimeout(() => {
    let err, res;
    if (typeof a != "number" || typeof b != "number") {
      err = "Gia tri truyen vao phai la so"
      return callback(err, null);
    }
    res = (a + b); // res ở đây = với kết quả là tổng sum cộng lại
    return callback(null, res);
  }, 1000)
};
sum(5, 8, (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  sum(res, 20, (err, res2) => {
    if (err) {
      console.log(err);
      return;
    }
    sum (res2, 50, (err, res3) => {
      if(err) {
        console.log(err);
        return;
      }
      console.log(res3)
    })
    // console.log(res2);
  })
  // console.log(res);
});
// console.log(tong);

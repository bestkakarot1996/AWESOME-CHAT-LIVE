let sum = (a,b) => {
  return new Promise ((resolve, rejects) => {
    setTimeout(() => {
      if (typeof a != "number" || typeof b != "number") {
        return rejects("Gia tri truyen vao la so");
      }
      resolve(a + b);
    }, 1000);
  });
}

(async () => {
  try {
    let tong01 =  await sum(7, 10);
    let tong02 = await sum(tong01, 10);
    let tong03 = await sum (tong02, 10);
    console.log(tong03);
    console.log(tong02);
    console.log(tong01);
  }
  catch (error) {
    console.log(error);
  }
})();

// hoac co the thuc thi 1 function bằng cách sau 

// let getTong = async () => {
//   try {
//     let tong01 =  await sum(7, 10);
//     console.log(tong01);
//   }
//   catch (error) {
//     console.log(error);
//   }
// }
// getTong();


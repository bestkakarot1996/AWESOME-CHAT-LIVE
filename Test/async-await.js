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

let getTong = async () => {
  try {
    let tong01 =  await sum(7, 10);
    console.log(tong01);
  }
  catch (error) {
    console.log(error);
  }
}
getTong();


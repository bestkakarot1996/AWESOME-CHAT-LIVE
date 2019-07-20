import { resolve } from "path";
import { rejects } from "assert";

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
sum(5,10)
  .then((tong) => sum(tong , 10))
  .then((tong2) => sum(tong2, 4))
  .then((tong3) => {
    console.log(tong3);
  })
  .catch((err) => {
    console.log(err);
  })
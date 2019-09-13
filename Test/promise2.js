const getSum = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a !== "number" || typeof b !== "number") {
        reject(
          {
            errors: "This is not number"
          }
        );
      }
      return resolve(
        {
          sum: a + b
        }
      );
    }, 3000)
  })
};

getSum(1, 2)
  .then((res1) => {
    console.log(res1.sum)
    return getSum(res1.sum, 3)
  })
  .then((res2) => {
    console.log(res2.sum)
    return getSum(res2.sum, 3)
  })
  .then((res3) => {
    console.log(res3.sum);
  })
  .catch(err =>
    console.log(err.errors)
  )
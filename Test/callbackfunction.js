const getData = (callback) =>
{
  setTimeout(() => {
    console.log("get Data success");
    callback();
  }, 4000)
};

const showData = () => 
{
  console.log("show Data View");
};

getData(() => {
  showData();
});

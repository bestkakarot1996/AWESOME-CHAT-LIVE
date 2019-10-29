
function increaseNumberNotiContact(className) {
  let currentValue = +$(`.${className}`).find("em").text();
  currentValue += 1;
  if (currentValue === 0) {
    $(`.${className}`).html(null);
  }
  else {
    $(`.${className}`).html(`(<em>${currentValue}</em>)`);
  }
};


function decreaseNumberNotiContact(className) {
  let currentValue = +$(`.${className}`).find("em").text();
  currentValue -= 1;
  if (currentValue === 0) {
    $(`.${className}`).html(null);
  }
  else {
    $(`.${className}`).html(`(<em>${currentValue}</em>)`);
  }
};

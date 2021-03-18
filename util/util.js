const toArray = (obj) => {
  let array = [];
  for (key in obj) {
    array.push(obj[key]);
  }
  return array;
};

exports.toArray = toArray;

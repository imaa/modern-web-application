const getInt = (num) => {
  let _number = parseInt(num);
  return !isNaN(_number) ? _number : null;
};
const getFloat = (num) => {
  let _number = parseFloat(num);
  return !isNaN(_number) ? _number : null;
};

module.exports = {
  getFloat: getFloat,
  getInt: getInt,
};

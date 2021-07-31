const getInt = (number) => {
  return !isNaN(number) && number ? parseInt(number) : null;
};
const getFloat = (number) => {
  return !isNaN(number) && number ? parseFloat(number) : null;
};
module.exports.numbers = { getInt: getInt, getFloat: getFloat };

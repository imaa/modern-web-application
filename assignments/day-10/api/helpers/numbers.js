const getInt = (number) => {
  return !isNaN(number) ? parseInt(number) : null;
};
const getFloat = (number) => {
  return !isNaN(number) ? parseFloat(number) : null;
};
module.exports.numbers = { getInt: getInt, getFloat: getFloat };

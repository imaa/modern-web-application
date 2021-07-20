const configs = require("../config/api-configs");

const doCalculation = (req, res) => {
  const number1 = parseInt(req.params[configs.calculater.num1] ?? 0);
  const number2 = parseInt(req.query[configs.calculater.num2] ?? 0);
  res.status(200).json(number1 + number2);
};

module.exports.caluclater = { calc: doCalculation };

const { HTTP_STATUS } = require("./httpStatus");

const response = (status, data) => {
  return Object.assign({}, { status: status, data: data });
};
module.exports.meanGamesResponse = response;
module.exports.serverErrorResponse = () => {
  return response(HTTP_STATUS.SERVER_ERROR, { message: "Internal Server Error" });
};
module.exports.unauthorizedResponse = () => {
  return response(HTTP_STATUS.UNAUTHORIZED, { message: "Unauthorized" });
};
module.exports.forbiddenResponse = () => {
  return response(HTTP_STATUS.FORBIDDEN, { message: "Forbidden" });
};
module.exports.completeRequest = (res, response) => {
  res.status(response.status).json(response.data);
};
module.exports.badRequestResponse = (res, message) => {
  res.status(HTTP_STATUS.BAD_REQUEST).json({ message: message });
};

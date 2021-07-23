var mongoose = require("mongoose");
const validateObjectIds = (ids) => {
  if (typeof ids === "object" && ids.length && ids.length > 0) {
    for (id of ids) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        isValid = false;
        break;
      }
    }
  } else if (typeof ids === "string") {
    isValid = mongoose.Types.ObjectId.isValid(ids);
  }
  return isValid;
};
module.exports = validateObjectIds;

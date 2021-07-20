const express = require("express");
require("dotenv").config();
const app = express();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Http server is running on http://${process.env.SERVER_NAME}:${
      server.address().port
    }/`
  );
});

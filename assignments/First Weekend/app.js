require("dotenv").config();
const express = require("express");
require("./src/api/data/db");
const apiConfig = require("./src/api/configs/api.config");
const appRouter = require("./src/api/routes");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Request received to ${req.url} with type ${req.method}`);
  next();
});
app.use(apiConfig.apiPrefix, appRouter.plRouter);
app.use(apiConfig.apiPrefix, appRouter.ideRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Programing languages api is running on http://localhost:${
      server.address().port
    }/`
  );
});

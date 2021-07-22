require("dotenv").config();
const express = require("express");
require("./api/data/db")
const router = require("./api/routes");

const app = express();
app.use(express.json())
app.use("/api", router)
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running http://localhost:${server.address().port}/`);
})

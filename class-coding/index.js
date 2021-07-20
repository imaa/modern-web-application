require("dotenv").config();
const routeConfig = require("./api/config/route-config")
const express = require("express")
const router = require("./api/routes")
const app = express();

app.use(express.static(process.env.PUBLIC_FOLDER));
app.use(routeConfig.api.base, router);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

const server = app.listen(process.env.PORT, (s) => {
    console.log(s);
    console.log("Server is  http://localhost:" + server.address().port + "/");
})
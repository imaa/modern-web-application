const router = require("express").Router();
require("./ide.router").config(router);
require("./programingLanguage.router").config(router);
module.exports = router;

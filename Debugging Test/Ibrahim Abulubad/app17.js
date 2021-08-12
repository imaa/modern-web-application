require("./api/data/db");
var express= require("express");
var path= require("path");
var routes= require("./api/routes");
var bodyParser= require("body-parser");

var app= express();

app.set("port", 3000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use(bodyParser.urlencoded({extended : false}));

app.use("/api", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use("/api", routes);

var server= app.listen(app.get("port"), function() {
    var port= server.address().port;
    console.log("Listening to port "+ port);
});

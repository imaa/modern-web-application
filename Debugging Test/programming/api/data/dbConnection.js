var MongoClient= require("mongodb").MongoClient;
var dbName= "meanGamesDb";
var dbURL= "mongodb://localhost:27017/"+dbName;
var _connection= null;

var open= function() {
    MongoClient.connect(dbURL, 
        {useUnifiedTopology: true}, 
        function(err, client) {
        if(err) {
            console.log("DB connection failed");
            return;
        }
        _connection= client.db(dbName);
        console.log("DB connection open", _connection);
    });
};

var get= function() {
    return _connection;
}

module.exports= {
    open : open,
    get : get
}
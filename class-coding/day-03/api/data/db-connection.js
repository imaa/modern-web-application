const mongoClient = require("mongodb").MongoClient

const dbName = "meanGames";
const dbUrl = "mongodb://localhost:27017/" + dbName;

let _conntection = null;

const open = () => {
    mongoClient.connect(dbUrl, (err, clinet) => {
        if (err) {
            console.log(err);
        } else {
            console.log(clinet);
            _conntection = clinet.db(dbName);
        }
    })
}
const get = () => { return _conntection; }
module.exports = { open: open, get: get }
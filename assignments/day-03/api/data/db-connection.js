const mongoClient = require("mongodb").MongoClient;

let _db_connection = null;
const open = () => {
  mongoClient.connect(
    process.env.DB_CONNECTION_URI + process.env.DB_NAME,
    (err, resul) => {
      if (err) {
        console.log(
          "unable to connect to the dtabase at ",
          process.env.DB_CONNECTION_URI + process.env.DB_NAME
        );
        return;
      }
      console.log(
        "Connection to mongo db succesflly established on ",
        process.env.DB_CONNECTION_URI + process.env.DB_NAME
      );
      _db_connection = resul.db(process.env.DB_NAME);
    }
  );
};
module.exports = {
  open: open,
  get: () => _db_connection,
};

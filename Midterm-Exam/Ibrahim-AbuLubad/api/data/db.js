const mongoose = require("mongoose");
require("./models/weather.model")
const _db_url = process.env.DB_URL + process.env.DB_NAME;
mongoose.connect(_db_url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(`Error in connecting to db`, err)
    }
});
mongoose.connection.on("connected", () => {
    console.log(`Connected to mongoDb ${_db_url}`);
})
mongoose.connection.on("disconnected", () => {
    console.log(`disconnected from mongoDb`);
})
mongoose.connection.on("error", () => {
    console.log(`error while trying to connecte to mongoDb`);
})
process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        process.exit(0);
    });
})
process.on("SIGUSR2", () => {
    mongoose.connection.close(() => {
        process.kill(process.pid, "SIGUSR2");
    });
})
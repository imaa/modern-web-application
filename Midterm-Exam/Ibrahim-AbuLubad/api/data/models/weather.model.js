const mongoose = require("mongoose");
const configs = require("../../configs/config");

const positionSchema = mongoose.Schema({
    type: {
        type: String
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});
const windSchema = mongoose.Schema({
    direction: Number,
    speed: Number
})
const weatherScheam = mongoose.Schema({
    st: String,
    ts: Number,
    position: positionSchema,
    airTemperature: Number,
    dewPoint: Number,
    pressure: Number,
    wind: windSchema,
    visibility: Number,
    precipitationEstimatedObservation: Number
})

mongoose.model(configs.models.weather.name, weatherScheam, configs.models.weather.collectionName);
var mongoose= require("mongoose");

var reviewSchema= mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var publisherSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // country: {
    //     type: String,
    //     required: true
    // },
    location: {
        // address: String,
        //Store coordinates in order longitude (E/W), latitude (N/S)
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    },
    // established: {
    //     type: Number,
    //     required: true,
    //     min: 1950,
    //     max: 2020
    // }
});

var gameSchema= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 1800,
        max: 2020
    },
    price: Number,
    designers: [String],
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        "default": 0
    },
    reviews: [reviewSchema],
    publisher: publisherSchema,
    minAge: {
        type: Number,
        min: 5,
        max: 99,
        required: true
    },
});

mongoose.model("Game", gameSchema, "games");
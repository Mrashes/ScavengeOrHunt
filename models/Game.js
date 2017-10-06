const mongoose = require("mongoose")

const Schema = mongoose.Schema

const GameSchema = new Schema({
    clue: {
        type: String,
        required: true,
    },    
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },    
    hitcounter: {
        type: Number,
        required: true,
        default: 10
    },
    locationnumber:{
        type: Number,
        required: true,
    }
})

const Game = mongoose.model("Game", GameSchema)

module.exports = Game
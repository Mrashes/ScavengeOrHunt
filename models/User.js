const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    scoredate: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User
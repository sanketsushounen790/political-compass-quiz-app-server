const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    creator: {
        type: String,
        required: true
    },
    updator: {
        type: String
    },
    xPosition: {
        type: Number,
        required: true
    },
    yPosition: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Comment", commentSchema)
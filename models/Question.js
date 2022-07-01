const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    creator: {
        type: String,
        required: true
    },
    updator: {
        type: String
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Question", questionSchema)
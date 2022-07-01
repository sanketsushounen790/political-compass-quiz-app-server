const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    questionId: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true
    },
    updator: {
        type: String
    },
    content: {
        type: String,
        required: true,
    },
    xPoint: {
        type: Number,
        required: true,
    },
    yPoint: {
        type: Number,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model("Answer", answerSchema)
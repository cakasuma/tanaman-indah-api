let mongoose = require('mongoose')

let FeedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
})

module.exports = mongoose.model('Feedback', FeedbackSchema)
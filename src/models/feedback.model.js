let mongoose = require('mongoose')

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}/${process.env.DB_DATABASE}`, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true);

let FeedbackSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    subject: String,
    message: String
})

module.exports = mongoose.model('Feedback', FeedbackSchema)
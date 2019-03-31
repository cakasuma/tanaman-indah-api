let mongoose = require('mongoose')

let PlantSchema = new mongoose.Schema({
    name: String,
    imagePath: {
        type: String,
        unique: true,
        required: true,
    },
    price: Number,
    description: String,
})

module.exports = mongoose.model('Plant', PlantSchema)
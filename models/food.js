const mongoose = require('mongoose')
const foodSchema = new mongoose.Schema({
    name: { type: String, required:true},
    price: { type: Number, required:true},
    img: { type: String, required: true},
    Description: { type: String, required:true},
})

const food = mongoose.model("food", foodSchema)

module.exports = food
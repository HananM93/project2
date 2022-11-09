const mongoose = require("mongoose")


const foodSchema = new mongoose.Schema({
    name: { type: String, required:true},
    description: { type: Array, required: true},
    img: { type: String, required: true},
})

const Food = mongoose.model("Food", foodSchema)

module.exports = Food
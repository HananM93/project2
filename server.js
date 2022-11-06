// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const food = require('./models/food')
const foodSeed = require("./models/foodSeed")

// .env
require("dotenv").config()

const PORT = process.env.PORT

// STATIC
app.use(express.static('public'));

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }))
// captures requests for put and delete and converts them from a post 
app.use(methodOverride("_method"))

//ROOT ROUTE
app.get('/', (req,res) => {
    res.send('welcome');
})

// I N D U C E S 
// INDEX | NEW | DELETE | UPDATE | CREATE | EDIT | SHOW 

// INDEX
app.get('/restaurant', (req,res) => {
    res.render('index.ejs', {
        foods:food
    })
})






// Listener 
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`))
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

// Database Connection
mongoose.connect(process.env.DATABASE_URL)

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



// Listener 
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))
// Dependencies
const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const app = express()

//Root Route / Home Page
app.get("/", (req, res) => {
  res.render("home.ejs")
})

// About
app.get("/about", (req, res) => {
  res.render("about.ejs")
})

// Contact
app.get("/contact", (req, res) => {
  res.render("contact.ejs")
})

// Routes / Controllers 
// import our book model to use
const foodsController = require("./controllers/foods")

// Pulls enviroment vars into server js from .en
require("dotenv").config()

// 1ST PORT AND 2ND PORT NOT THE SAME 
const PORT = process.env.PORT; "3000"

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

// use the books controllers for books routes
app.use("/foods", foodsController)

// include public static files
app.use(express.static('public'))
// Listener 
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`))
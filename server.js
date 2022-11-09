// Dependencies
const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const Food = require("./models/food.js")
const methodOverride = require("method-override")
const foodSeed = require("./models/foodSeed.js")

// Database Connection
mongoose.connect(process.env.DATABASE_URL)

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))


// include public static files
app.use(express.static('public'))

// Middleware
// Body parser middleware: give us access to req.body
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))

// I N D U C E S 
// INDEX | NEW | DELETE | UPDATE | CREATE | EDIT | SHOW 

//Seed
app.get("/foods/seed", (req, res) => {
  Food.deleteMany({}, (error, allFoods) => {})
  Food.create(foodSeed, (error, data) => {
    res.redirect("/foods")
  })
})



// Index
app.get("/foods", (req, res) => {
    Food.find({}, (error, allFoods) => {
      res.render("index.ejs", {
        foods: allFoods,
      })
    })
  })

// New
app.get("/foods/new", (req, res) => {
    res.render("new.ejs")
  })

//DELETE
app.delete("/foods/:id", (req, res) => {
    Food.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/foods")
    })
  })

// UPDATE
app.put("/foods/:id", (req,res) => {
  // console.log(error)
    Food.findByIdAndUpdate (
        req.params.id, req.body, {
            new: true,
        }, (error, updatedFood) => {
            res.redirect(`/foods/${req.params.id}`)
        }
    )
})
  
// Create
app.post("/foods", (req,res) => {
    Food.create(req.body, (error, createdFood) => {
      // console.log(error)
        res.redirect("/foods")
    })
})

// Edit
app.get("/foods/:id/edit", (req, res) => {
  Food.findById(req.params.id, (error, foundFood) => {
    res.render("edit.ejs", {
      food: foundFood,
    })
  })
})

// Show 
app.get("/foods/:id", (req, res) => {
    Food.findById(req.params.id, (err, foundFood) => {
      res.render("show.ejs", {
        food: foundFood,
      })
    })
  })

// Listener
const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`))
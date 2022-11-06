// Dependencies
const express = require('express')
const foodRouter = express.Router()
const food = require('../models/food')
const foodSeed = require("../models/foodSeed")


// I N D U C E S 
// INDEX | NEW | DELETE | UPDATE | CREATE | EDIT | SHOW 

// Seed 

foodRouter.get("/seed", (req, res) => {
    food.deleteMany({}, (error, allFoods) => {})
    food.create(foodSeed, (error, data) => {
      res.redirect("/foods")
    })
  })

// INDEX
foodRouter.get("/", (req, res) => {
    food.find({}, (error, allFoods) => {
      res.render("index.ejs", {
        foods: allFoods,
      })
    })
  })

// New 
foodRouter.get("/new", (req, res) => {
    res.render("new.ejs")
  })  

// DELETE 
foodRouter.delete("/:id", (req, res) => {
    food.findByIdAndRemove(req.params.id, (err, deletedFood) => {
        res.redirect("/foods")
    })
})

// Create
foodRouter.post("/", (req, res) => {
    res.send("received")
  })

// Show
foodRouter.get("/:id", (req, res) => {
    food.findById(req.params.id, (err, foundFood) => {
      res.render("show.ejs", {
        food: foundFood,
      })
    })
  })

module.exports = foodRouter
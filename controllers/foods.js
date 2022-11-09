// Dependencies
const express = require("express")
const foodRouter = express.Router()
const Food = require("../models/food.js")
const foodSeed = require("../models/foodSeed.js")
// I N D U C E S 
// INDEX | NEW | DELETE | UPDATE | CREATE | EDIT | SHOW 

//Seed
foodRouter.get("/seed", (req, res) => {
    Food.deleteMany({}, (error, allFoods) => {})
    Food.create(foodSeed, (error, data) => {
      res.redirect("/foods")
    })
  })



// Index
foodRouter.get("/", (req, res) => {
    Food.find({}, (error, allFoods) => {
      res.render("index.ejs", {
        foods: allFoods,
      })
    })
  })

// New
foodRouter.get("/new", (req, res) => {
    res.render("new.ejs")
  })

//DELETE
foodRouter.delete("/:id", (req, res) => {
    Food.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/foods")
    })
  })

  // UPDATE
foodRouter.put("/:id", (req,res) => {
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
foodRouter.post("/", (req,res) => {
    Food.create(req.body, (error, createdFood) => {
      // console.log(error)
        res.redirect("/foods")
    })
})

// Edit
foodRouter.get("/:id/edit", (req, res) => {
  Food.findById(req.params.id, (error, foundFood) => {
    res.render("edit.ejs", {
      food: foundFood,
    })
  })
})

// Show 
foodRouter.get("/:id", (req, res) => {
    Food.findById(req.params.id, (err, foundFood) => {
      // console.log(error)
      res.render("show.ejs", {
        food: foundFood,
      })
    })
  })

module.exports = foodRouter
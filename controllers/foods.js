
// I N D U C E S 
// INDEX | NEW | DELETE | UPDATE | CREATE | EDIT | SHOW 

// Seed 

app.get("foods/seed", (req, res) => {
    food.deleteMany({}, (error, allFoods) => {})
    food.create(foodSeed, (error, data) => {
      res.redirect("/foods")
    })
  })

// INDEX
app.get("/foods", (req, res) => {
    food.find({}, (error, allFoods) => {
      res.render("index.ejs", {
        foods: allFoods,
      })
    })
  })

// New 
app.get("/foods/new", (req, res) => {
    res.render("new.ejs")
  })  

// DELETE 
app.delete("/foods/:id", (req, res) => {
    food.findByIdAndRemove(req.params.id, (err, deletedFood) => {
        res.redirect("/foods")
    })
})

// Create
app.post("/foods", (req, res) => {
    res.send("received")
  })

// Show
app.get("/foods:id", (req, res) => {
    food.findById(req.params.id, (err, foundFood) => {
      res.render("show.ejs", {
        food: foundFood,
      })
    })
  })

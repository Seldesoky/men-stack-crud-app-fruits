require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// Connecting to MongoDB
mongoose.connect(MONGO_URI);
mongoose.connection.once('open', () => {
    console.log('MongoDB is showing love');
});
mongoose.connection.on('error', () => {
    console.error('You know how MongoDB be trippin');
});

// Middleware
const Fruit = require("./models/fruit.js");
app.use(express.urlencoded({ extended: false }));


// GET, INDEX /

  app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

  // GET /fruits
  app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
  });
  
  

  app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
  });

  //Show By Fruit ID
  
  app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
  });
  
  

  // POST /fruits

  app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits"); // redirect to index fruits
  });
  

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
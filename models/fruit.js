const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
  }, {
    timestamps: true
  });

  const Fruit = mongoose.model("Fruit", fruitSchema);

  module.exports = Fruit;


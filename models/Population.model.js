const { Schema, model } = require("mongoose");

const populationSchema = new Schema({
  city: String,
  state: String,
  population: String,
});

const Population = model("Population", populationSchema);

module.exports = Population;

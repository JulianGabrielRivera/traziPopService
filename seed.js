const CSVToJSON = require("csvtojson");
const Population = require("./models/Population.model");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    CSVToJSON()
      .fromFile("./city_populations.csv")
      .then((source) => {
        // console.log(source);
        source.forEach((object) => {
          Population.create({
            city: object.city,
            state: object.state,
            population: object.population,
          });
        });
      });
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

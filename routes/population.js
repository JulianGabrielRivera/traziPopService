var express = require("express");
var router = express.Router();
const Population = require("../models/Population.model");

/* GET home page. */
router.get(
  "/population/state/:state/city/:city",
  async function (req, res, next) {
    try {
      const { state, city } = req.params;
      const population = await Population.findOne({ state: state, city: city });
      if (population) {
        res.status(200).json({ population: +population.population });
      } else {
        res
          .status(400)
          .json({ error: "Population for this city and state not available." });
      }
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  }
);
router.put(
  "/population/state/:state/city/:city",
  async function (req, res, next) {
    try {
      const { state, city, population } = req.body;

      if (state === "" || city === "" || population === "") {
        res.status(400).json({ message: "One or more fields are empty" });
        return;
      }
      const updatePopulation = await Population.findOneAndUpdate(
        { state, city },
        { population: population },
        {
          new: true,
        }
      );
      if (updatePopulation) {
        res.status(200).json({ message: "Successfully updated " });
      } else {
        const CityandStatePopulation = await Population.create({
          city,
          state,
          population,
        });
        res
          .status(201)
          .json({ message: "City, state, and population created" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Could not update or added" });
    }
  }
);

module.exports = router;

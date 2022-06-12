const restaurant = require("../../models/restaurant");

const getMostViewRestaurant = async (req, res) => {
  try {
    const restaurants = await restaurant
        .aggregate([{ $sample: { size: 10 } }])

    if (restaurants) {
      res.status(200).send({
        total: restaurants.length,
        data: restaurants,
      });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getMostViewRestaurant;

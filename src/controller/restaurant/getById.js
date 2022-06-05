const Restaurant = require("../../models/restaurant");

const getRestaurantByID = async (req, res) => {
  try {
    const { restaurant_ID } = req.params;
    const restaurantDetail = await Restaurant.find({ _id: restaurant_ID })
      .populate("province_id")
      .populate("district_id");

    if (restaurantDetail) {
      res.status(200).send({
        data: restaurantDetail,
      });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getRestaurantByID;

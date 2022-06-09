const Restaurant = require("../../models/restaurant");

const getRestaurantByIndex = async (req, res) => {
  try {
    const { pageIndex, pageSize, currentPage } = req.query;
    const allRestaurant = await restaurant.find({})
      .skip(currentPage * pageIndex)
      .limit(pageSize)
      .populate("province_id")
      .populate("district_id");

    if (allRestaurant) {
      res.status(200).send({
        total: allRestaurant.length,
        data: allRestaurant,
      });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getRestaurantByIndex;

const restaurant = require("../../models/restaurant");

const searchRestaurant = async (req, res) => {
  try {
    const { searchString, pageIndex, pageSize, currentPage } = req.body;
    console.log(req.body)
    const restaurants = await restaurant.find({
            $or: [
                { "address_detail": { $regex: searchString || "" } },
                { "name": { $regex: searchString || "" }},
            ]
        })
        .skip(currentPage * pageIndex)
        .limit(pageSize)
        .populate("province_id")
        .populate("district_id");

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

module.exports = searchRestaurant;

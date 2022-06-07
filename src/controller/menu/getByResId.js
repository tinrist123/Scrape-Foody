const Menu = require("../../models/menu");

const getMenuByRestaurantID = async (req, res) => {
  try {
    const { restaurant_ID } = req.params;
    console.log(restaurant_ID);
    const menuOfRestaurant = await Menu.find({
      restaurant_id: restaurant_ID,
    }).populate("restaurant_id");

    if (menuOfRestaurant) {
      res.status(200).send({
        total: menuOfRestaurant.length,
        data: menuOfRestaurant,
      });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getMenuByRestaurantID;

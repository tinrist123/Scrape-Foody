const Comment = require("../../models/comment");

const GetByRestaurantID = async (req, res) => {
  try {
    const { restaurant_ID } = req.params;
    const menuOfRestaurant = await Comment.find({
      restaurant_id: restaurant_ID,
    });

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

module.exports = GetByRestaurantID;

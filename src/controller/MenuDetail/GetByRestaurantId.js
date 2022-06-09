const MenuDetail = require("../../models/menu_detail");

const getByID = async (req, res) => {
  try {
    const { menu_id } = req.params;
    const MenuDetailModel = await MenuDetail.find({
      menu_id: menu_id,
    }).populate("menu_id");

    if (MenuDetailModel) {
      res.status(200).send({
        total: MenuDetailModel.length,
        data: MenuDetailModel,
      });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getByID;

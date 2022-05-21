const mongoose = require("mongoose");
const dish = require("./dish");
const menu = require("./menu");

const MenuDetailSchema = mongoose.Schema(
  {
    dish_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: dish,
    },
    menu_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: menu,
    },
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("menu_details", MenuDetailSchema);
s;

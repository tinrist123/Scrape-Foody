const mongoose = require("mongoose");
const restaurant = require("./restaurant");

const MenuSchema = mongoose.Schema(
  {
    name: String,
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: restaurant,
    },
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("menu", MenuSchema);

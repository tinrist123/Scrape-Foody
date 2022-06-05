const mongoose = require("mongoose");
const restaurant = require("./restaurant");

const MenuSchema = mongoose.Schema(
  {
    name: String,
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: restaurant,
    },
    fake_id: Number,
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("menu", MenuSchema);

const mongoose = require("mongoose");

const RestaurantTypeSchema = mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("restaunrant_type", RestaurantTypeSchema);

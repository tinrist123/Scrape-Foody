const mongoose = require("mongoose");

const DishTypeSchema = mongoose.Schema(
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

module.exports = mongoose.model("dish_type", DishTypeSchema);

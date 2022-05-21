const mongoose = require("mongoose");

const DishSchema = mongoose.Schema(
  {
    name: String,
    photo: {
      type: [String],
      default: [],
    },
    price: Number,
    description: String,
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("dish", DishSchema);

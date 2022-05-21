const mongoose = require("mongoose");
const restaurant = require("./restaurants");

const CommentSchema = mongoose.Schema(
  {
    name: String,
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: restaurant,
    },
    content: String,
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("comment", CommentSchema);

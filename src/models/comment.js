const mongoose = require("mongoose");
const restaurant = require("./restaurant");

const CommentSchema = mongoose.Schema(
  {
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: restaurant,
    },
    content: String,
    title: String,
    avatar_url: String,
    display_name: String,
    fake_id: Number,
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("comment", CommentSchema);

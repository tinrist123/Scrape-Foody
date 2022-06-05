const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    width: Number,
    height: Number,
    value: String,
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("images", ImageSchema);

const mongoose = require("mongoose");

const ProvinceSchema = mongoose.Schema(
  {
    name: String,
    fake_id: Number,
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("province", ProvinceSchema);

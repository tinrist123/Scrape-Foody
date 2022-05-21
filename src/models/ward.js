const mongoose = require("mongoose");
const district = require("./district");
const province = require("./province");

const WardSchema = mongoose.Schema(
  {
    province_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: province,
    },
    district_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: district,
    },
    name: String,
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("ward", WardSchema);

const mongoose = require("mongoose");
const province = require("./province");

const DistrictSchema = mongoose.Schema(
  {
    province_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: province,
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

module.exports = mongoose.model("district", DistrictSchema);

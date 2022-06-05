const mongoose = require("mongoose");
const restaunrant_type = require("./restaurant_type");
const province = require("./province");
const district = require("./district");
const image = require("./image");

const RestaurantSchema = mongoose.Schema(
  {
    name: String,
    restaurant_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: restaunrant_type,
    },
    address_detail: String,
    open_time: {
      type: [String],
      default: [],
    },
    phone: String,
    rating: Number,
    short_description: String,
    photos: [
      {
        type: [
          {
            width: Number,
            height: Number,
            value: String,
          },
        ],
        default: [],
      },
    ],
    lat: Number,
    lng: Number,
    price_range: {
      type: [String],
      default: [],
    },
    fake_id: Number,
    province_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: province,
    },
    district_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: district,
    },
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("restaurant", RestaurantSchema);

const mongoose = require("mongoose");
const restaunrant_type = require("./restaunrant_type");

const RestaurantSchema = mongoose.Schema(
  {
    name: String,
    restaurant_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: restaunrant_type,
    },
    address_detail: String,
    open_time: String,
    phone: String,
    rating: Number,
    short_description: String,
    photos: {
      type: [String],
      default: [],
    },
    lat: Number,
    lng: Number,
    price_range: {
      type: [String],
      default: [],
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

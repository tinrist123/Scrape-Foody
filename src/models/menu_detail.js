const mongoose = require("mongoose");
const menu = require("./menu");

const MenuDetailSchema = mongoose.Schema(
  {
    menu_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: menu,
    },
    name: String,
    description: String,
    price: String,
    discount_price: String,
    photo: [
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
    fake_id: Number,
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date",
    },
  }
);

module.exports = mongoose.model("menu_details", MenuDetailSchema);

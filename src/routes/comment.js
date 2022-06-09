const express = require("express");
const router = express.Router();

const { GetByRestaurantID } = require("../controller/");

//GET ALL CATEGORIES
router.get("/:restaurant_ID", GetByRestaurantID);

module.exports = router;

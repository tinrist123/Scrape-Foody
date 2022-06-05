const express = require("express");
const router = express.Router();

const { GetByRestaurantId } = require("../controller/");

//GET ALL CATEGORIES
router.get("/:restaurant_id", GetByRestaurantId);

module.exports = router;

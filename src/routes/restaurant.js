const express = require("express");
const router = express.Router();

const { getById, getByIndex, getRecommendRestaurant } = require("../controller/");

//GET ALL CATEGORIES
router.get("/:restaurant_ID", getById);

// get by index, pageSize
router.get("/", getByIndex);

router.get('/recommend/:restaurant_ID', getRecommendRestaurant)

module.exports = router;

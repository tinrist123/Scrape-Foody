const express = require("express");
const router = express.Router();

const { getById, getByIndex, getRecommendRestaurant, searchRestaurant, getMostViewRestaurant, getNearlyRestaurant } = require("../controller/");

//GET ALL CATEGORIES
router.get("/:restaurant_ID", getById);

// get by index, pageSize
router.get("/", getByIndex);

router.get("/recommend/:restaurant_ID", getRecommendRestaurant);

router.post("/search", searchRestaurant);

router.post("/mostview", getMostViewRestaurant);

router.post("/nearly", getNearlyRestaurant);

module.exports = router;

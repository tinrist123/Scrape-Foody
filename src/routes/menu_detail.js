const express = require("express");
const router = express.Router();

const { GetByRestaurantId } = require("../controller/");

//GET ALL CATEGORIES
router.get("/:menu_id", GetByRestaurantId);

module.exports = router;
